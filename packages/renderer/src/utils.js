import { merge } from 'lodash';
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
