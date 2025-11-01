from fastapi import APIRouter, HTTPException
from typing import List
from .models import Item

router = APIRouter(prefix="/api")

# Mock database
items_db = [
    {"id": 1, "name": "Item 1", "description": "Description for Item 1"},
    {"id": 2, "name": "Item 2", "description": "Description for Item 2"},
    {"id": 3, "name": "Item 3", "description": "Description for Item 3"},
]

@router.get("/items", response_model=List[Item])
async def get_items():
    return items_db

@router.get("/items/{item_id}", response_model=Item)
async def get_item(item_id: int):
    for item in items_db:
        if item["id"] == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")

@router.post("/items", response_model=Item)
async def create_item(item: Item):
    items_db.append(item.dict())
    return item