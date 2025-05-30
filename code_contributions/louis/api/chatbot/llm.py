import os
from langchain.llms.base import LLM
from llama_cpp import Llama

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
MODEL_PATH = os.path.join(REPO_ROOT, "api", "models", "llama-2-7b-chat.Q4_K_M.gguf")

class LocalLlamaLLM(LLM):
    class Config:
        arbitrary_types_allowed = True  # <-- This line is important!

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self._llm = Llama(model_path=MODEL_PATH, n_ctx=2048)

    def _call(self, prompt, **kwargs):
        output = self._llm(
            prompt,
            max_tokens=512,
            stop=["<|end_of_text|>"]
        )
        return output["choices"][0]["text"]

    @property
    def _llm_type(self):
        return "local-llama"