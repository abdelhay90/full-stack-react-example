import express from 'express';
import path from 'path'
import cors from 'cors';
import bodyParser from 'body-parser';
import {connectDB} from "./connect-db";
import './initialize-db'
import {authenticationRoute} from './authenticate';
import {getTasks, updateTask, removeTask, addNewTask} from "./communicate-db";

let port = process.env.PORT || 8888;

let app = express();

app.listen(port, console.log('server is listening on port', port));

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}),);
app.use(bodyParser.json());

authenticationRoute(app);

if (process.env.NODE_ENV == `production`) {
    app.use(express.static(path.resolve(__dirname, '../../dist')));
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve('index.html'));
    });
}


app.get('/tasks', async (req, res) => {
    let data = await getTasks();
    res.status(200).send(data);
});

app.get('/tasks/:id', async (req, res) => {
    let taskId = req.params.id;
    let [data] = await getTasks(taskId);
    if (data !== undefined) {
        res.status(200).send(data);
    } else {
        res.status(404).send("Not Found")
    }
});

app.post('/tasks', async (req, res) => {
    console.info(req.body)
    let task = req.body;
    await addNewTask(task);
    res.status(200).send();
});

app.put('/tasks', async (req, res) => {
    let task = req.body;
    await updateTask(task);
    res.status(200).send();
});

app.delete('/tasks/:id', async (req, res) => {
    let task = req.params.id;
    await removeTask(task);
    res.status(200).send();
});

app.post('/comments', async (req, res) => {
    let comment = req.body.comment;
    let db = await connectDB();
    let collection = db.collection(`comments`);
    await collection.insertOne(comment);
    res.status(200).send();
});