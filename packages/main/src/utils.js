import fs from 'fs';
import { merge } from 'lodash';

export const out = (rawData, name) => {
  BigInt.prototype['toJSON'] = function () {
    return this.toString();
  };

  let data = JSON.stringify(rawData, null, 2);
  fs.writeFileSync(`data/${name}.json`, data);
};

export const mergeData = function () {
  let combined = [];
  if (!arguments) {
    return combined;
  }

  for (let x = 0; x < arguments.length; x++) {
    merge(combined, arguments[x]);
  }

  return combined;
};
