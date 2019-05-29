import {take, put, select} from 'redux-saga/effects';
import * as mutations from './mutations'
import axios from 'axios';
import uuid from 'uuid';
import {history} from "./history";

const url = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8888';

export function* taskCreationSaga() {
    while (true) {

        const {groupId} = yield take(mutations.REQUEST_TASK_CREATION);
        const ownerId = 'U1';
        const taskId = uuid();
        yield put(mutations.createTask(taskId, groupId, ownerId));
        const {res} = yield axios.post(url + '/tasks', {
            id: taskId,
            group: groupId,
            owner: ownerId,
            isComplete: false,
            name: 'New Task'
        });

        console.info("got response", res)
    }
}

export function* taskModificationSaga() {
    while (true) {

        const task = yield take([
            mutations.SET_TASK_GROUP,
            mutations.SET_TASK_NAME,
            mutations.SET_TASK_COMPLETE
        ]);
        yield axios.put(url + '/tasks', {
            id: task.taskId,
            group: task.groupId,
            isComplete: task.isComplete,
            name: task.name
        });

        console.info("got response", 'from update')
    }
}

export function* authenticateUserSaga() {
    while (true) {

        const {username, password} = yield take(mutations.REQUEST_AUTHENTICATE_USER);
        try {
            const {data} = yield axios.post(url + '/authenticate', {
                username, password
            });
            if (!data) {
                throw new Error()
            }

            yield put(mutations.setState(data.state));
            yield put(mutations.processAuthentication(mutations.AUTHENTICATED))
            history.push('/dashboard')

        } catch (e) {
            console.log('cannot authenticate');
            yield put(mutations.processAuthentication(mutations.NOT_AUTHENTICATED))
        }
    }
}