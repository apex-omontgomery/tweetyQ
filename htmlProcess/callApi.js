urlMain = 'https://6506028f.ngrok.io';

const getUser = user_id => {
  return fetch(`${urlMain}/user/${user_id}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

const getTweet = tweet => {
  return fetch(`${urlMain}/tweet/${encodeURIComponent(tweet)}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

user = '123452334';
tweet = 'hi there friend how are you?';

getTweet(tweet);
getUser(user);
