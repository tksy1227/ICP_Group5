import fastapi
import uvicorn

app = fastapi.FastAPI()

@app.get("/")
