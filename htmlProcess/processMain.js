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
  const tweetInnerText = singleTweet.innerText;
  const tweetId = singleTweet.getAttribute('data-item-id');
  const userId = singleTweet.getAttribute('data-user-id');

  // tweet container- assume one

  // use data attribute for tweet id

  let tweetObject = singleTweet.getElementsByClassName(
    'js-tweet-text-container'
  );
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
