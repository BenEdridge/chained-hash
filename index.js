const hasher = require('./chained-hash');

const getHash = async () => {
  const result = await hasher.generateHash('SHA256', './test.file');
  console.log(result);
};

getHash();