"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeTask = exports.updateTask = exports.addNewTask = exports.getTasks = void 0;

var _connectDb = require("./connect-db");

const getTasks = async id => {
  let db = await (0, _connectDb.connectDB)();
  let collection = db.collection('tasks');
  let data;

  if (id) {
    data = await collection.find({
      id
    }).toArray();
  } else {
    data = await collection.find({}).toArray();
  }

  return data;
};

exports.getTasks = getTasks;

const addNewTask = async task => {
  let db = await (0, _connectDb.connectDB)();
  let collection = db.collection('tasks');
  await collection.insertOne(task);
};

exports.addNewTask = addNewTask;

const updateTask = async task => {
  let {
    id,
    name,
    group,
    isComplete
  } = task;
  let db = await (0, _connectDb.connectDB)();
  let collection = db.collection('tasks');

  if (group) {
    await collection.updateOne({
      id
    }, {
      $set: {
        group
      }
    });
  }

  if (name) {
    await collection.updateOne({
      id
    }, {
      $set: {
        name
      }
    });
  }

  if (isComplete !== undefined) {
    await collection.updateOne({
      id
    }, {
      $set: {
        isComplete
      }
    });
  }
};

exports.updateTask = updateTask;

const removeTask = async id => {
  let db = await (0, _connectDb.connectDB)();
  let collection = db.collection('tasks');

  if (id) {
    await collection.deleteOne({
      id
    });
  }
};

exports.removeTask = removeTask;