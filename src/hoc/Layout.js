import React, { Fragment } from 'react';
import Nav from '../components/Nav';

const Layout = (props) => {
    return (
        <Fragment>
            <Nav />
            <main>
                {props.children}
            </main>
        </Fragment>
    );
};

export default Layout;
