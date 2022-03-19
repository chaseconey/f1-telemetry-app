import { parse } from 'csv-parse/sync';
import fs from 'fs';
import { merge, keyBy } from 'lodash';
import { app } from 'electron';

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

export const loadDriverMap = (driverMapFile) => {
  let csv = fs.readFileSync(driverMapFile);
  const parsed = parse(csv, {
    columns: () => ['number', 'name'],
    skip_empty_lines: true,
  });

  return keyBy(parsed, 'number');
};

export const handleFinalClassification = (driverData, session) => {
  const raceData = {
    driverData,
    session,
  };

  const downloadPath = app.getPath('downloads');
  const fileName = session.m_header.m_sessionUID;
  const fileLocation = `${downloadPath}/${fileName}.json`;

  fs.writeFileSync(fileLocation, JSON.stringify(raceData));

  console.log(`Race data written to ${fileLocation}`);
};
