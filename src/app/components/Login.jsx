import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as mutations from "../store/mutations";


export const LoginComponent = ({authenticateUser, authenticated}) => (
    <div className={'card p-3 col-6'}>
        <h2>Please Login</h2>
        <form onSubmit={authenticateUser}>
            <input className={'form-control'} type="text" placeholder='Username' name='username' defaultValue='Dev'/>
            <input className={'form-control mt-2'} type="password" placeholder='Password' name='password' defaultValue=''/>
            {authenticated === mutations.NOT_AUTHENTICATED ?
                <p>Login incorrect!</p> : null}
            <button className={'form-control mt-2 btn btn-primary'} type='submit'>Login</button>
        </form>
    </div>
);


function mapDispatchToProps(dispatch, ownProps) {
    return {
        authenticateUser(e) {
            e.preventDefault();
            dispatch(mutations.requestAuthenticateUser(
                e.target['username'].value, e.target['password'].value))
        }
    }
}

function mapStateToProps({session}) {
    return {authenticated: session.authenticated};
}

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);