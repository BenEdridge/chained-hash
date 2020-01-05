const crypto = require('crypto');
const fs = require('fs');

// Hash is not configurable due to limitations

// Valid and secure hash functions
const hashes = [
  'SHA256',
  'SHA3-256',
  'SHA-512',
  'SHA3-512',
  'SHAKE128',
  'SHAKE256'
];

module.exports = {

  ///
  // HASH function
  generateHash: (type, data) => {
    if(!hashes.find(element => element === type.toUpperCase())){
      throw Error(`Invalid Hash type, must choose from: ${hashes}`);
    };

    const input = fs.createReadStream(data);
    const hash = crypto.createHash(type);

    return new Promise((resolve, reject) => {
      input.on('readable', () => {
        const temp = input.read();
        if(temp){
          hash.update(temp);
        } else {
          resolve(hash.digest('hex'));
        }
      });
      input.on('error', reject);
    });
  },

  /// SIG function

};