import streamlit as st
from llama_cpp import Llama

# Update this path if you move the model file or run from a different folder
MODEL_PATH = "../models/llama-3-8b-instruct.Q4_K_M.gguf"

@st.cache_resource(show_spinner="Loading Llama model...")
def load_llama():
    return Llama(model_path=MODEL_PATH, n_ctx=2048)

llm = load_llama()

st.title("Local Llama 3 Chatbot")

user_input = st.text_area("Ask anything:")

if st.button("Send") and user_input.strip():
    with st.spinner("Thinking..."):
        output = llm(
            user_input,
            max_tokens=256,
            stop=["<|end_of_text|>"]
        )
        st.write(output["choices"][0]["text"])