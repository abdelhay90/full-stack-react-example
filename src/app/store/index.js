import {createStore, applyMiddleware, combineReducers} from 'redux';
import {defaultState} from "../../server/defaultState";
import {createLogger} from "redux-logger/src";
import createSagaMiddleware from 'redux-saga';
import * as sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
import * as mutations from './mutations'
import {SET_STATE} from "./mutations";


export const store = createStore(
    combineReducers({
        tasks(tasks = [], action) {
            switch (action.type) {
                case SET_STATE:
                    return action.state.tasks;
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
        comments(comments = [], action) {
            switch (action.type) {
                case SET_STATE:
                    return action.state.comments;
            }
            return comments;
        },
        groups(groups = [], action) {
            switch (action.type) {
                case SET_STATE:
                    return action.state.groups;
            }
            return groups;
        },
        users(users = []) {
            return users;
        },
        session(userSession = defaultState.session || {}, action) {
            let {type, authenticated, session} = action;
            switch (type) {
                case SET_STATE:
                    return {
                        ...userSession,
                        id: action.state.session.id
                    };
                case mutations.REQUEST_AUTHENTICATE_USER:
                    return {...userSession, authenticated: mutations.AUTHENTICATING};
                case mutations.PROCESSING_AUTHENTICATE_USER:
                    return {...userSession, authenticated};
                default:
                    return userSession;
            }
        }
    }),
    applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
    sagaMiddleware.run(sagas[saga]);
}