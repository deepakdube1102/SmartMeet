from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from processor import NLPProcessor
import uvicorn

app = FastAPI(title="SmartMeet API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Processor
processor = NLPProcessor()

class MeetingInput(BaseModel):
    text: str

@app.get("/")
async def root():
    return {"message": "SmartMeet API is running"}

@app.post("/process")
async def process_meeting(data: MeetingInput):
    try:
        results = processor.process(data.text)
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
