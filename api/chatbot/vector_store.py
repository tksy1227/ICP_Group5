from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores.base import VectorStoreRetriever

def get_retriever(persist_directory: str = "vector_db", k: int = 2) -> VectorStoreRetriever:
    embedding_model = HuggingFaceEmbeddings()

    db = Chroma(
        persist_directory=persist_directory,
        embedding_function=embedding_model
    )

    return db.as_retriever(search_kwargs={"k": k})