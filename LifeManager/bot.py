from slack import WebClient
from slack.errors import SlackApiError
from os.path import join, dirname
from dotenv import load_dotenv
import os

# env_listの用意
load_dotenv(verbose=True)
env_path: str = join(dirname(__file__), ".env")

load_dotenv(env_path)
env_list: list[str] = os.environ


def main():
  slack_token: str = env_list["SLACK_TOKEN"]
  try:
    client: slack.web.client.WebClient = WebClient(slack_token)
  except Exception as err:
    print("Error:", err)

  post_message(client, "テストメッセージ")

def post_message(client, message):
  print("post_message()", ("message:", message))
  channel_id: str = env_list["CHANNEL_ID"]
  try:
    response = client.chat_postMessage(
      channel=channel_id,
      text=message,
    )

    print("response:", response)
  except SlackApiError as err:
    print("Error:", err.response["error"])


if __name__ == "__main__":
  main()
