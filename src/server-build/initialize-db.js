"use strict";

var _defaultState = require("./defaultState");

var _connectDb = require("./connect-db");

async function initializeDB() {
  let db = await (0, _connectDb.connectDB)();
  let user = await db.collection('users').findOne({
    id: 'U1'
  });

  if (!user) {
    for (let collectionName in _defaultState.defaultState) {
      let collection = db.collection(collectionName);
      collection.insertMany(_defaultState.defaultState[collectionName]);
    }
  }
}

initializeDB();