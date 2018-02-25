// builds all tweet containers
const getAllTweetDoms = () => {
  let users = [];
  const allTweetElements = document.getElementsByClassName('tweet');

  return Array.from(allTweetElements).map(singleTweet => {
    return tweetObjectBuilder(singleTweet);
  });
};

// get url, get text, get tweet id, get user id
const tweetObjectBuilder = singleTweet => {
  const tweetObject = singleTweet.getElementsByClassName(
    'js-tweet-text-container'
  )[0];
  const tweetText = tweetObject.getElementsByClassName('tweet-text');
  const urlObj = tweetObject.getElementsByClassName('twitter-timeline-link');

  return {
    userId: singleTweet.getAttribute('data-user-id'),
    tweetId: singleTweet.getAttribute('data-item-id'),
    text: singleLevelTweetText(tweetText),
    url: getSingleUrl(urlObj),
    isArticle: isTweetArticle(tweetObject)
  };
};

const getSingleUrl = tweetObject => {
  const lastLink = Array.from(tweetObject).pop(); //convert to array,get last item
  return typeof lastLink === undefined ? '' : lastLink.href;
};

const singleLevelTweetText = textObject => {
  (child = textObject[0].firstChild), (texts = []);
  console.log(child);
  while (child) {
    if (child.nodeType == 3) {
      console.log('child found');
      console.log(child);
      texts.push(child.data);
    }
    child = child.nextSibling;
  }
  return texts.join('');
};

// returns if tweet is article or non-article
const isTweetArticle = tweetDomItem => {
  return 0;
};

console.log(getAllTweetDoms());
