# chatbot/llm.py

from langchain.llms.base import LLM
from llama_cpp import Llama

# Initialise llama.cpp model
llm = Llama(
    model_path=r"C:\Users\louis\Downloads\Chatbot\llama-2-7b-chat.Q4_K_M.gguf",
    n_ctx=2048,
    n_threads=6
)

class LlamaCppLLM(LLM):
    def _call(self, prompt, **kwargs):
        max_input_length = 2048 - 128
        truncated_prompt = prompt[:max_input_length]
        output = llm(f"<s>[INST] {truncated_prompt} [/INST]", max_tokens=512, temperature=0.7, top_p=0.95)
        return output["choices"][0]["text"].strip()

    @property
    def _llm_type(self):
        return "llama-cpp"