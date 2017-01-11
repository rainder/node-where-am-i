'use strict';

const GeoPoint = require('geo-point');
const path = require('path');
const childProcess = require('child_process');

const BINARY = path.resolve(__dirname, 'bin/whereami');

module.exports = {
  getLocation,
};

/**
 *
 * @returns {Promise}
 */
function getLocation() {
  return new Promise((resolve, reject) => {
    childProcess.exec(BINARY, (err, stdout, stderr) => {
      if (err) {
        return reject(new Error(stdout));
      }

      if (stdout) {
        return resolve(parseStdout(stdout));
      }

      return reject(new Error(stderr));
    });
  });
}

/**
 *
 * @param stdout
 * @returns {{point: *, accuracy: number, timestamp: Date}}
 */
function parseStdout(stdout) {
  const data = stdout.trim()
    .split('\n')
    .map((item) => item.split(': ').pop());

  const date = [
    data[3].substr(6, 4),
    data[3].substr(3, 2),
    data[3].substr(0, 2),
    data[3].substr(12),
  ].join(' ');

  return {
    point: new GeoPoint(+data[0], +data[1]),
    accuracy: +data[2],
    timestamp: new Date(date),
  };
}
