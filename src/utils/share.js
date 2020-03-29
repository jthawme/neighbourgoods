export const tweetLink = () => {
  const tweet = {
    url: "https://neighbourgoods.london",
    text: "Support your local independents, find them on this map",
    hashtags: "neighbourgoods"
  };

  return [
    "https://twitter.com/intent/tweet?",
    `url=${tweet.url}`,
    "&",
    `text=${tweet.text}`,
    "&",
    `hashtags=${tweet.hashtags}`
  ].join("");
};
