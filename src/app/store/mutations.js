export const REQUEST_TASK_CREATION = 'REQUEST_TASK_CREATION';
export const CREATE_TASK = 'CREATE_TASK';
export const SET_TASK_COMPLETE = 'SET_TASK_COMPLETE';
export const SET_TASK_NAME = 'SET_TASK_NAME';
export const SET_TASK_GROUP = 'SET_TASK_GROUP';
export const REQUEST_AUTHENTICATE_USER = 'REQUEST_AUTHENTICATE_USER';
export const PROCESSING_AUTHENTICATE_USER = 'PROCESSING_AUTHENTICATE_USER';
export const AUTHENTICATING = 'AUTHENTICATING';
export const AUTHENTICATED = 'AUTHENTICATED';
export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED';
export const SET_STATE = 'SET_STATE';


export const requestTaskCreation = (groupId) => ({
    type: REQUEST_TASK_CREATION,
    groupId
});

export const createTask = (taskId, groupId, ownerId) => ({
    type: CREATE_TASK,
    taskId,
    groupId,
    ownerId
});

export const setTaskCompletion = (taskId, isComplete) => ({
    type: SET_TASK_COMPLETE,
    taskId,
    isComplete
});

export const setTaskGroup = (taskId, groupId) => ({
    type: SET_TASK_GROUP,
    taskId,
    groupId
});

export const setTaskName = (taskId, name) => ({
    type: SET_TASK_NAME,
    taskId,
    name
});

export const requestAuthenticateUser = (username, password) => ({
    type: REQUEST_AUTHENTICATE_USER,
    username,
    password
});

export const processAuthentication = (status = AUTHENTICATING, session = null) => ({
    type: PROCESSING_AUTHENTICATE_USER,
    session,
    authenticated: status
});

export const setState = (state = {}) => ({
    type: SET_STATE,
    state
});