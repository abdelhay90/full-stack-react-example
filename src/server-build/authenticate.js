"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticationRoute = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _md = _interopRequireDefault(require("md5"));

var _connectDb = require("./connect-db");

var _utility = require("./utility");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authenticationTokens = [];

const authenticationRoute = app => {
  app.post('/authenticate', async (req, res) => {
    let {
      username,
      password
    } = req.body;
    let db = await (0, _connectDb.connectDB)();
    let collection = db.collection(`users`);
    let user = await collection.findOne({
      name: username
    });

    if (!user) {
      return res.status(500).send(`User not found`);
    }

    let hash = (0, _md.default)(password);
    let passwordCorrect = hash === user.passwordHash;

    if (!passwordCorrect) {
      return res.status(500).send('Password incorrect');
    }

    let token = (0, _uuid.default)();
    authenticationTokens.push({
      token,
      userID: user.id
    });
    let state = await (0, _utility.assembleUserState)(user);
    res.send({
      token,
      state
    });
  });
  /*
  * create new user
  * */

  app.post('/user/create', async (req, res) => {
    let {
      username,
      password
    } = req.body;
    console.log(username, password);
    let db = await (0, _connectDb.connectDB)();
    let collection = db.collection(`users`);
    let user = await collection.findOne({
      name: username
    });

    if (user) {
      res.status(500).send({
        message: "A user with that account name already exists."
      });
      return;
    }

    ;
    let userID = (0, _uuid.default)();
    let groupID = (0, _uuid.default)();
    await collection.insertOne({
      name: username,
      id: userID,
      passwordHash: (0, _md.default)(password)
    });
    await db.collection(`groups`).insertOne({
      id: groupID,
      owner: userID,
      name: `To Do`
    });
    let state = await (0, _utility.assembleUserState)({
      id: userID,
      name: username
    });
    res.status(200).send({
      userID,
      state
    });
  });
};

exports.authenticationRoute = authenticationRoute;