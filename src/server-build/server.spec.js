"use strict";

var _server = require("./server");

(async function () {
  await (0, _server.addNewTask)({
    name: "My task",
    id: "12345"
  });
  await (0, _server.updateTask)({
    name: "My task",
    id: "12345",
    isComplete: false,
    group: 'G1'
  });
  await (0, _server.removeTask)("12345");
})();