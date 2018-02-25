const processPersonality = userData => {
  userData = userData.personalityData;
  return {
    personality: reduceListObjects(userData.personality),
    values: reduceListObjects(userData.values)
  };
};

const reduceListObjects = listObject => {
  return listObject.reduce((obj, item) => {
    obj[item.name] = item.raw_score;
    return obj;
  }, {});
};

export default processPersonality;
