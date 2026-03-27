from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
import os

class LLMRequest(BaseModel):
    name: str
    personality: str
    player_message: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"]
)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

MODEL_NAME = 'gemini-2.5-flash-lite'

@app.post("/llm_input")
def llm_input(data: LLMRequest):
    prompt = f"""
You are a college student named {data.name} and this is your personality: {data.personality}. 
You are approached by a student who is in the University of Mississippi's Coding Club and that student is trying to convince you to join the Coding Club by saying this: "{data.player_message}"
Respond according to your personality.
Rules:
1) Max 2 short sentences.
2) End with STRICTLY 1 or 0 (1=yes join, 0=no join).
3) Never omit the final 1 or 0.

"""
    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    return {"llm_response": response.text.strip}
    
    

