import os
from os.path import join, dirname
from dotenv import load_dotenv
from twython import Twython, TwythonError

def main():
  load_dotenv(verbose=True)
  dotenv_path = join(dirname(__file__), '.env')
  load_dotenv(dotenv_path)

  # APIの準備
  API_KEY = os.environ.get("API_KEY")
  ACCESS_TOKEN = os.environ.get("ACCESS_TOKEN")
  api = Twython(API_KEY, access_token=ACCESS_TOKEN)

  # tweetの取得
  USER_NAME = os.environ.get("USER_NAME")
  try:
    user_timeline = api.get_user_timeline(screen_name=USER_NAME, count=2)
    for tweet in user_timeline:
      now_tweet = tweet['text']
      print(now_tweet)
  except TwythonError as e:
    print('error: ', e)

if __name__ in "__main__":
  main()