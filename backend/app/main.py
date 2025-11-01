from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Microservice API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the Microservice API"}

@app.get("/api/items")
async def get_items():
    # Mock data - in a real app, this would come from a database
    items = [
        {"id": 1, "name": "Item 1", "description": "Description for Item 1"},
        {"id": 2, "name": "Item 2", "description": "Description for Item 2"},
        {"id": 3, "name": "Item 3", "description": "Description for Item 3"},
    ]
    return items