from llama_cpp import Llama
from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain.llms.base import LLM

import tkinter as tk
from tkinter import scrolledtext
import os

#load model
llm = Llama(
    model_path="C:\\Chatbot\\llama-2-7b-chat.Q4_K_M.gguf", 
    n_ctx=2048,
    n_threads=6
)

# wrapper class
class LlamaCppLLM(LLM):
    def _call(self, prompt, **kwargs):
        output = llm(
            f"<s>[INST] {prompt} [/INST]",
            max_tokens=512,
            temperature=0.7,
            top_p=0.95
        )
        return output["choices"][0]["text"].strip()

    @property
    def _llm_type(self):
        return "llama-cpp"

# embedding
embedding_model = HuggingFaceEmbeddings()

# check if vector store exists
persist_dir = "C:\\Chatbot\\chroma_db"
if os.path.exists(persist_dir):
    db = Chroma(persist_directory=persist_dir, embedding_function=embedding_model)
else:
    #load document
    loader = TextLoader("C:\\Chatbot\\Data for Chatbot\\Data for Chatbot\\Indonesia_Agriculture_Extension1.txt") 
    documents = loader.load()

    #split
    splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_documents(documents)

    db = Chroma.from_documents(
        documents=chunks,
        embedding=embedding_model,
        persist_directory=persist_dir
    )
    db.persist()

retriever = db.as_retriever()

qa_chain = RetrievalQA.from_chain_type(
    llm=LlamaCppLLM(),
    chain_type="stuff",
    retriever=retriever
)

# GUI
def get_response():
    user_input = entry.get()
    if user_input.strip() == "":
        return
    chat_area.insert(tk.END, "You: " + user_input + "\n")
    entry.delete(0, tk.END)
    
    if user_input.lower() in ["exit", "quit"]:
        window.destroy()
        return

    try:
        response = qa_chain.run(user_input)
        chat_area.insert(tk.END, "Bot: " + response + "\n\n")
        chat_area.see(tk.END)
    except Exception as e:
        chat_area.insert(tk.END, "Bot: Error - " + str(e) + "\n\n")
        chat_area.see(tk.END)

window = tk.Tk()
window.title("🧠 LLaMA2 Local Chatbot")
window.geometry("600x500")
window.configure(bg="#f0f0f0")

chat_area = scrolledtext.ScrolledText(window, wrap=tk.WORD, font=("Segoe UI", 11), bg="white", state="normal")
chat_area.pack(padx=10, pady=10, fill=tk.BOTH, expand=True)

entry = tk.Entry(window, font=("Segoe UI", 12))
entry.pack(padx=10, pady=(0, 10), fill=tk.X)
entry.focus()

send_button = tk.Button(window, text="Send", command=get_response, font=("Segoe UI", 10))
send_button.pack(padx=10, pady=(0, 10))

window.bind("<Return>", lambda event: get_response())

chat_area.insert(tk.END, "🔵 Chatbot ready! Ask questions based on your document.\n💬 Type 'exit' to quit.\n\n")

window.mainloop()
