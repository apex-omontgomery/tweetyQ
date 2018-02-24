// builds all tweet containers
const getAllTweetDoms = () => {
  let users = [];
  const allTweetElemnts = document.getElementsByClassName('js-stream-item');
  const builtTweetElements = allTweetElemnts.map(
    singleTweet => tweetObjectBuilder
  );
};

//
const tweetObjectBuilder = singleTweet => {};

// returns if tweet is article or non-article
const classifyTweetType = tweetDomItem => {
  return 0;
};
