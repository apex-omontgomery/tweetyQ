// builds all tweet containers
const getAllTweetDoms = () => {
  let users = [];
  const allTweetElements = document.getElementsByClassName('tweet');
  const builtTweetElements = allTweetElemnts.map(
    singleTweet => tweetObjectBuilder
  );
};

// get url, get text, get tweet id, get user id
const tweetObjectBuilder = singleTweet => {
  const tweetObject = singleTweet.getElementsByClassName(
    'js-tweet-text-container'
  );

  return {
    userId: singleTweet.getAttribute('data-user-id'),
    tweetId: singleTweet.getAttribute('data-item-id'),
    text: singleLevelText(tweetObject),
    url: getSingleUrl(tweetObject)
  };
};

const getSingleUrl = jsTweetContainer => {
  let returnUrl = '';
  const url = jsTweetContainer.getElementsByClassName('twitter-timeline-link');
  if (url.length > 0) {
    returnUrl = url[0].href;
  }
};

const singleLevelTweetText = jsTweetContainer => {
  (child = jsTweetContainer.firstChild), (texts = []);

  while (child) {
    if (child.nodeType == 3) {
      texts.push(child.data);
    }
    return child.nextSibling;
  }
  return texts.join('');
};

// returns if tweet is article or non-article
const classifyTweetType = tweetDomItem => {
  return 0;
};
