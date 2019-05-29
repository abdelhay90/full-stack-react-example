"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _connectDb = require("./connect-db");

require("./initialize-db");

var _authenticate = require("./authenticate");

var _communicateDb = require("./communicate-db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

try {
  let port = process.env.PORT || 8888;
  let app = (0, _express.default)();
  app.listen(port, console.log('server is listening on port', port));
  app.use((0, _cors.default)());
  app.use(_bodyParser.default.urlencoded({
    extended: true
  }));
  app.use(_bodyParser.default.json());
  (0, _authenticate.authenticationRoute)(app);

  if (process.env.NODE_ENV == `production`) {
    app.use(_express.default.static(_path.default.resolve(__dirname, '../../dist')));
    app.get('/*', (req, res) => {
      res.sendFile(_path.default.resolve('index.html'));
    });
  }

  app.get('/tasks', async (req, res) => {
    let data = await (0, _communicateDb.getTasks)();
    res.status(200).send(data);
  });
  app.get('/tasks/:id', async (req, res) => {
    let taskId = req.params.id;
    let [data] = await (0, _communicateDb.getTasks)(taskId);

    if (data !== undefined) {
      res.status(200).send(data);
    } else {
      res.status(404).send("Not Found");
    }
  });
  app.post('/tasks', async (req, res) => {
    console.info(req.body);
    let task = req.body;
    await (0, _communicateDb.addNewTask)(task);
    res.status(200).send();
  });
  app.put('/tasks', async (req, res) => {
    let task = req.body;
    await (0, _communicateDb.updateTask)(task);
    res.status(200).send();
  });
  app.delete('/tasks/:id', async (req, res) => {
    let task = req.params.id;
    await (0, _communicateDb.removeTask)(task);
    res.status(200).send();
  });
  app.post('/comments', async (req, res) => {
    let comment = req.body.comment;
    let db = await (0, _connectDb.connectDB)();
    let collection = db.collection(`comments`);
    await collection.insertOne(comment);
    res.status(200).send();
  });
} catch (e) {
  console.error(e);
}