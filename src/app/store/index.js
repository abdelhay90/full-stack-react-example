import {createStore, applyMiddleware, combineReducers} from 'redux';
import {defaultState} from "../../server/defaultState";
import {createLogger} from "redux-logger/src";
import createSagaMiddleware from 'redux-saga';
import * as sagas from './sagas.mock';

const sagaMiddleware = createSagaMiddleware();
import * as mutations from './mutations'


export const store = createStore(
    combineReducers({
        tasks(tasks = defaultState.tasks, action) {
            switch (action.type) {
                case mutations.CREATE_TASK:
                    return [...tasks,
                        {
                            id: action.taskId,
                            group: action.groupId,
                            owner: action.ownerId,
                            name: 'New Task',
                            isComplete: false
                        }];
                case mutations.SET_TASK_COMPLETE:
                    return tasks.map(task => ((task.id === action.taskId ? {
                        ...task,
                        isComplete: action.isComplete
                    } : task)));
                case mutations.SET_TASK_GROUP:
                    return tasks.map(task => ((task.id === action.taskId ? {
                        ...task,
                        group: action.groupId
                    } : task)));
                case mutations.SET_TASK_NAME:
                    return tasks.map(task => ((task.id === action.taskId ? {
                        ...task,
                        name: action.name
                    } : task)));
            }
            return tasks;
        },
        comments(comments = defaultState.comments) {
            return comments;
        },
        groups(groups = defaultState.groups) {
            return groups;
        },
        users(users = defaultState.users) {
            return users;
        }
    }),
    applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
    sagaMiddleware.run(sagas[saga]);
}