import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import * as mutations from "../store/mutations";


export const TaskDetail = ({
                               id, comments, task,
                               isComplete, groups, setTaskCompletion,
                               setTaskName, setTaskGroup
                           }) => (
    <div>
        <div>
            <input type="text" value={task.name} onChange={setTaskName}/>
        </div>
        <div>
            <button
                onClick={() => setTaskCompletion(id, !isComplete)}
            >{isComplete ? 'Reopen' : 'Complete'}</button>
        </div>

        <div>
            <select onChange={setTaskGroup} value={task.group}>
                {groups.map(group => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                ))}
            </select>
        </div>

        <div>
            <Link to='/dashboard'>
                <button>Done</button>
            </Link>
        </div>
    </div>
);

function mapStateToProps(state, ownProps) {
    let id = ownProps.match.match.params.id;

    let task = state.tasks.find(task => task.id === id);
    let groups = state.groups;
    return {
        id,
        task,
        groups,
        isComplete: task.isComplete
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    let id = ownProps.match.match.params.id;
    return {
        setTaskCompletion(id, isComplete) {
            dispatch(mutations.setTaskCompletion(id, isComplete))
        },
        setTaskGroup(e) {
            dispatch(mutations.setTaskGroup(id, e.target.value))
        },
        setTaskName(e) {
            dispatch(mutations.setTaskName(id, e.target.value))
        },
    }
}

export const ConnectedTaskDetail = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskDetail);