const processNLP = data => {
  const listObjects = (dataMetricsArray = [].concat.apply(
    [],
    [extractKeywords(data.entities), extractKeywords(data.keywords)]
  ));
  return avgListObjects(listObjects);
};

var avgListObjects = dataInput => {
  return Array.from(
    dataInput.reduce(
      (acc, obj) =>
        Object.keys(obj).reduce(
          (acc, key) =>
            typeof obj[key] == 'number'
              ? acc.set(
                  key,
                  // immediately invoked function:
                  (([sum, count]) => [sum + obj[key], count + 1])(
                    acc.get(key) || [0, 0]
                  )
                ) // pass previous value
              : acc,
          acc
        ),
      new Map()
    ),
    ([name, [sum, count]]) => ({ name, average: sum / count })
  );
};

const extractKeywords = jsonData => {
  return jsonData.map(arrayItem => {
    return arrayItem.emotion;
  });
};

export default processNLP;
