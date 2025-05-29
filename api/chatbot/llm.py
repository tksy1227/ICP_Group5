from langchain.llms.base import LLM
import replicate
import os

class ReplicateLlamaLLM(LLM):
    def __init__(self):
        self.api_token = os.environ["REPLICATE_API_TOKEN"]
        replicate.Client(api_token=self.api_token)

    def _call(self, prompt, **kwargs):
        # You can change the model version to the latest Llama2 or Llama3 from Replicate's website
        output = replicate.run(
            "meta/a16z-infra/llama7b-v2-chat:4f0a4744c7295c024a1de15e1a63c880d3da035fa1f49bfd344fe076074c8eea",  # Example version
            input={
                "prompt": prompt,
                "max_new_tokens": 512,
                "temperature": 0.7,
                "top_p": 0.95
            }
        )
        # Replicate returns a generator; join the output
        return "".join(list(output))

    @property
    def _llm_type(self):
        return "replicate-llama"