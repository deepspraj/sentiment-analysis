import tweepy
import configparser


class Twitter:

    def __init__(self):
        config = configparser.ConfigParser()
        config.read('config.ini')

        self.auth = tweepy.OAuthHandler(config['twitter']['api_key'], config['twitter']['api_key_secret'])
        self.auth.set_access_token(config['twitter']['access_token'], config['twitter']['access_token_secret'])

    def __tweets_puller(self, username, count=10):
        tweets_list = []

        api = tweepy.API(self.auth)

        tweets = tweepy.Cursor(api.user_timeline, screen_name=username, count=count, tweet_mode='extended').items(count)
        tweets = api.user_timeline(screen_name=username, count=count, tweet_mode='extended')

        for tweet in tweets:
            tweets_list.append(tweet.full_text)

        return tweets_list

    def tweets_api(self, user, limit):
        return self.__tweets_puller(user, limit)


if __name__ == "__main__":
    twitter = Twitter()
    print(twitter.tweets_api("aramco", 10))