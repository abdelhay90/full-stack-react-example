import {MongoClient} from 'mongodb';

const url = process.env.MONGODB_URI || "mongodb://localhost:27017/myorganizer";

let db = null;

export async function connectDB() {
    if (db) {
        return db;
    }
    let client
    try {
        client = await MongoClient.connect(url, {
            useNewUrlParser: true
        });
    } catch (e) {
        console.error(e)
        return null;
    }
    db = client.db();
    return db;
}

