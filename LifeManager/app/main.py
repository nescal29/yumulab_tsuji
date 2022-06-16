from fastapi import FastAPI
from slack_bot import SlackBot
import json

app: FastAPI = FastAPI()
slack_bot: SlackBot = SlackBot()
@app.get("/")
async def slack_response():
  slack_bot.post_message("FastAPIお試し中")
  return {"message": "test"}
