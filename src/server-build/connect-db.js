"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectDB = connectDB;

var _mongodb = require("mongodb");

const url = process.env.MONGODB_URI || "mongodb://localhost:27017/myorganizer";
let db = null;

async function connectDB() {
  if (db) {
    return db;
  }

  let client;

  try {
    client = await _mongodb.MongoClient.connect(url, {
      useNewUrlParser: true
    });
  } catch (e) {
    console.error(e);
    return null;
  }

  db = client.db();
  return db;
}