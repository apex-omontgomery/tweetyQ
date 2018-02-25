urlMain = 'https://127.0.0.1:5000';

const callApiBase = route => {
  fetch(`{urlMain}/{route}`, {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(json)
  })
    .then(res => res.json())
    .then(res => console.log(res));
};

const callUser = json => {
  return callApiBase('user');
};

const callTweet = json => {
  return callApiBase('tweet');
};

userJson = { user_id: '123452334' };
tweetJson = { tweet: 'hi there friend' };

callUser(userJson);
callTweet(tweetJson);
