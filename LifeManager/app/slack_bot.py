from slack import WebClient
from slack.errors import SlackApiError
from os.path import join, dirname
from dotenv import load_dotenv
import os

# env_listの用意
class SlackBot:
  def __init__(self):
    load_dotenv(verbose=True)
    env_path: str = join(dirname(__file__), "../.env")

    load_dotenv(env_path)
    env_list: list[str] = os.environ
    self.slack_token: str = env_list["SLACK_TOKEN"]
    self.channel_id: str = env_list["CHANNEL_ID"]

    try:
      self.client: slack.web.client.WebClient = WebClient(self.slack_token)
    except Exception as err:
      print("Error:", err)

  def post_message(self, message):
    print("post_message()", ("message:", message))

    try:
      response = self.client.chat_postMessage(
        channel=self.channel_id,
        text=message,
      )
      print("response:", response)

    except SlackApiError as err:
      print("Error:", err.response["error"])

