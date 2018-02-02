import React, {PropTypes} from 'react';
import { Link } from 'react-router-dom'
import {slide as Menu} from 'react-burger-menu';
import { withRouter } from 'react-router-dom';

const SideBar = (props) => {
console.log(props);
const {pathname } =props.location;

if(pathname === '/login' || pathname === '/logout' || pathname === '/' || pathname === '/invitation' || pathname === '/welcome') {
	return null;
}
    return (


    <Menu className="bm-menu" right>
        <Link className="bm-item-list" to="/">			Home</Link>
        <Link className="bm-item-list" to="/events">	Events</Link>
        <Link className="bm-item-list" to="/logout">	Logout</Link>
    </Menu>

    );
};

export default withRouter(SideBar);