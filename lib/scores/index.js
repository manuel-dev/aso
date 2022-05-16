'use strict';

const getTraffic = require('./traffic');
const getDifficulty = require('./difficulty');

const PRECISSION = 5

function build (store) {
  return function (keyword, precission) {
    keyword = keyword.toLowerCase();
    precission = precission || PRECISSION;
    return store
      .search({term: keyword, num: precission, fullDetail: true})
      .then((apps) => Promise.all([
        getDifficulty(store)(keyword, apps, precission),
        getTraffic(store)(keyword, apps, precission)
      ]))
      .then((results) => ({
        difficulty: results[0],
        traffic: results[1]
      }));
  };
}

module.exports = build;
