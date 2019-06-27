import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

export const Navigation = () => (
	<div>
		<Link to='/dashboard'>
			<h2>My Application</h2>
		</Link>
	</div>
);

function mapStateToProps(state) {
	return state;
}

export const ConnectedNavigation = connect(
	mapStateToProps,
)(Navigation);
