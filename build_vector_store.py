from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.document_loaders import DirectoryLoader, TextLoader, PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter

# Load and preprocess documents
folder_path = "chatbot_data"
txt_loader = DirectoryLoader(path=folder_path, glob="**/*.txt", loader_cls=TextLoader)
pdf_loader = DirectoryLoader(path=folder_path, glob="**/*.pdf", loader_cls=PyPDFLoader)
documents = txt_loader.load() + pdf_loader.load()

splitter = CharacterTextSplitter(chunk_size=300, chunk_overlap=30)
chunks = splitter.split_documents(documents)

# Generate embeddings
embedding_model = HuggingFaceEmbeddings()

# Persist the vector store
persist_directory = "vector_db"
db = Chroma.from_documents(
    documents=chunks,
    embedding=embedding_model,
    persist_directory=persist_directory
)
db.persist()