import {connectDB} from './connect-db'

export async function assembleUserState(user) {
    let db = await connectDB();
    let tasks = await db.collection('tasks').find({owner: user.id}).toArray();
    let groups = await db.collection('groups').find({owner: user.id}).toArray();
    let comments = await db.collection('comments').find({owner: user.id}).toArray();

    return {
        tasks,
        groups,
        comments,
        session: {
            authenticated: 'AUTHENTICATED',
            id: user.id
        }
    }
}