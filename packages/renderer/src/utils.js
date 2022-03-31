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

export const formatSecondsToMinutes = (duration) => {
  // Hours, minutes and seconds
  var hrs = ~~(duration / 3600);
  var mins = ~~((duration % 3600) / 60);
  var secs = (duration % 60).toFixed(3);

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = '';

  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }

  ret += '' + mins + ':' + (secs < 10 ? '0' : '');
  ret += '' + secs;
  return ret;
};
