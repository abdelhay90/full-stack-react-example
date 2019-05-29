import {connectDB} from "./connect-db";

export const getTasks = async (id) => {
    let db = await connectDB();
    let collection = db.collection('tasks');
    let data;
    if (id) {
        data = await collection.find({id}).toArray();
    } else {
        data = await collection.find({}).toArray();
    }
    return data
};

export const addNewTask = async (task) => {
    let db = await connectDB();
    let collection = db.collection('tasks');
    await collection.insertOne(task)
};

export const updateTask = async task => {
    let {id, name, group, isComplete} = task;
    let db = await connectDB();
    let collection = db.collection('tasks');

    if (group) {
        await collection.updateOne({id}, {$set: {group}})
    }
    if (name) {
        await collection.updateOne({id}, {$set: {name}})
    }
    if (isComplete !== undefined) {
        await collection.updateOne({id}, {$set: {isComplete}})
    }
};

export const removeTask = async id => {
    let db = await connectDB();
    let collection = db.collection('tasks');

    if (id) {
        await collection.deleteOne({id})
    }
};