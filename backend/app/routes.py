from fastapi import APIRouter, HTTPException, Response, status
from typing import List, Optional
from pydantic import BaseModel
from .models import Item

router = APIRouter(prefix="/api")

# Item update model
class ItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

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

@router.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(item_id: int):
    for index, item in enumerate(items_db):
        if item["id"] == item_id:
            items_db.pop(index)
            return Response(status_code=status.HTTP_204_NO_CONTENT)
    raise HTTPException(status_code=404, detail="Item not found")

@router.put("/items/{item_id}", response_model=Item)
async def update_item(item_id: int, item_update: ItemUpdate):
    for index, item in enumerate(items_db):
        if item["id"] == item_id:
            # Update only the fields that are provided
            if item_update.name is not None:
                items_db[index]["name"] = item_update.name
            if item_update.description is not None:
                items_db[index]["description"] = item_update.description
            return items_db[index]
    raise HTTPException(status_code=404, detail="Item not found")