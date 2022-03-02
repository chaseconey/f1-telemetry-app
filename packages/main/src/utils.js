const fs = require('fs');

export const out = (rawData, name) => {
  BigInt.prototype['toJSON'] = function () {
    return this.toString();
  };

  let data = JSON.stringify(rawData, null, 2);
  fs.writeFileSync(`data/${name}.json`, data);
};
