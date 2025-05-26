from llama_cpp import Llama
from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.document_loaders import TextLoader, DirectoryLoader, PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain.llms.base import LLM

import tkinter as tk
from tkinter import scrolledtext, ttk

# locate model
llm = Llama(
    model_path="C:\\Chatbot\\llama-2-7b-chat.Q4_K_M.gguf", 
    n_ctx=2048,
    n_threads=6
)

# create class
class LlamaCppLLM(LLM):
    def _call(self, prompt, **kwargs):
        max_input_length = 2048 - 128
        truncated_prompt = prompt[:max_input_length]

        output = llm(
            f"<s>[INST] {truncated_prompt} [/INST]",
            max_tokens=512,
            temperature=0.7,
            top_p=0.95
        )
        return output["choices"][0]["text"].strip()

    @property
    def _llm_type(self):
        return "llama-cpp"

#TXT and PDF
folder_path = "C:\\Chatbot\\Testing data"

txt_loader = DirectoryLoader(
    path=folder_path,
    glob="**/*.txt",
    loader_cls=TextLoader
)

pdf_loader = DirectoryLoader(
    path=folder_path,
    glob="**/*.pdf",
    loader_cls=PyPDFLoader
)

documents = txt_loader.load() + pdf_loader.load()

# split into chunks
splitter = CharacterTextSplitter(chunk_size=300, chunk_overlap=30)
chunks = splitter.split_documents(documents)

# embedding
embedding_model = HuggingFaceEmbeddings()
db = Chroma.from_documents(chunks, embedding_model)

retriever = db.as_retriever(search_kwargs={"k": 2})

# RetrievalQA Chain
qa_chain = RetrievalQA.from_chain_type(
    llm=LlamaCppLLM(),
    chain_type="stuff",
    retriever=retriever
)

# interface
def get_response():
    user_input = entry.get()
    if not user_input.strip():
        return
    chat_area.insert(tk.END, "🧑‍💻 You: " + user_input + "\n")
    entry.delete(0, tk.END)

    if user_input.lower() in ["exit", "quit"]:
        window.destroy()
        return

    chat_area.insert(tk.END, "🤖 Bot: Thinking...\n")
    chat_area.see(tk.END)
    window.update()

    try:
        response = qa_chain.run(user_input)
        chat_area.insert(tk.END, f"🤖 Bot: {response}\n\n")
    except Exception as e:
        chat_area.insert(tk.END, f"🤖 Bot: Error - {str(e)}\n\n")

    chat_area.see(tk.END)


window = tk.Tk()
window.title("🌴 PalmPilot Chatbot")
window.geometry("700x600")
window.configure(bg="#f5f5f5")


style = ttk.Style()
style.configure("TButton", font=("Segoe UI", 10))
style.configure("TEntry", font=("Segoe UI", 12))


chat_area = scrolledtext.ScrolledText(window, wrap=tk.WORD, font=("Segoe UI", 11), bg="white", state="normal")
chat_area.pack(padx=10, pady=10, fill=tk.BOTH, expand=True)


bottom_frame = tk.Frame(window, bg="#f5f5f5")
bottom_frame.pack(fill=tk.X)

entry = tk.Entry(bottom_frame, font=("Segoe UI", 12))
entry.pack(side=tk.LEFT, padx=(10, 5), pady=10, fill=tk.X, expand=True)
entry.focus()

send_button = ttk.Button(bottom_frame, text="Send", command=get_response)
send_button.pack(side=tk.RIGHT, padx=(5, 10), pady=10)


window.bind("<Return>", lambda event: get_response())


chat_area.insert(tk.END, "🔵 PalmPilot is ready! Ask questions from your uploaded documents.\n💬 Type 'exit' to quit.\n\n")

window.mainloop()
