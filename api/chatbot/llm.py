from langchain.llms.base import LLM
import replicate
import os

class ReplicateLlamaLLM(LLM):
    def _call(self, prompt, **kwargs):
        api_token = os.environ.get("REPLICATE_API_TOKEN")
        if not api_token:
            raise ValueError("REPLICATE_API_TOKEN environment variable is not set.")
        replicate.Client(api_token=api_token)
        output = replicate.run(
            "meta/a16z-infra/llama7b-v2-chat:4f0a4744c7295c024a1de15e1a63c880d3da035fa1f49bfd344fe076074c8eea",
            input={
                "prompt": prompt,
                "max_new_tokens": 512,
                "temperature": 0.7,
                "top_p": 0.95
            }
        )
        return "".join(list(output))

    @property
    def _llm_type(self):
        return "replicate-llama"