"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultState = void 0;

var _md = _interopRequireDefault(require("md5"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultState = {
  /*session: {
      authenticated: false,
  },*/
  users: [{
    id: "U1",
    name: "Dev",
    passwordHash: (0, _md.default)("TUPLES"),
    friends: [`U2`]
  }, {
    id: "U2",
    name: "C. Eeyo",
    passwordHash: (0, _md.default)("PROFITING"),
    friends: []
  }],
  groups: [{
    name: "To Do",
    id: "G1",
    owner: "U1"
  }, {
    name: "Doing",
    id: "G2",
    owner: "U1"
  }, {
    name: "Done",
    id: "G3",
    owner: "U1"
  }],
  tasks: [{
    name: "Refactor tests",
    id: "T1",
    group: "G1",
    owner: "U1",
    isComplete: false
  }, {
    name: "Meet with CTO",
    id: "T2",
    group: "G1",
    owner: "U1",
    isComplete: true
  }, {
    name: "Compile ES6",
    id: "T3",
    group: "G2",
    owner: "U2",
    isComplete: false
  }, {
    name: "Update component snapshots",
    id: "T4",
    group: "G2",
    owner: "U1",
    isComplete: true
  }, {
    name: "Production optimizations",
    id: "T5",
    group: "G3",
    owner: "U1",
    isComplete: false
  }],
  comments: [{
    owner: "U1",
    id: "C1",
    task: "T1",
    content: "Great work!"
  }]
};
exports.defaultState = defaultState;