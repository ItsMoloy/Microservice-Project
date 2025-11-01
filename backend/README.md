# Backend Microservice

This is the Python FastAPI backend for the microservice project.

## Setup

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Run the server:
   ```
   python run.py
   ```

The API will be available at http://localhost:8000

## API Endpoints

- `GET /api/items` - Get all items
- `GET /api/items/{item_id}` - Get a specific item by ID
- `POST /api/items` - Create a new item

## Project Structure

- `app/` - Main application package
  - `__init__.py` - Package initialization
  - `main.py` - FastAPI application setup
  - `models.py` - Pydantic data models
  - `routes.py` - API route handlers
- `run.py` - Server startup script
- `requirements.txt` - Python dependencies