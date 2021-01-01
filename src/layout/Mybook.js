import React, { useEffect } from 'react';
import { makeStyles, Box } from '@material-ui/core';
import Nav from '../components/Nav';
import BottomNav from '../components/BottomNav';
import firebase from "../firebase";

const useStyles = makeStyles(theme => ({
    rootcss: {
        height: '100vh'
    }
}));

const Mybook = (props) => {
    const classes = useStyles();

    useEffect(() => {
        // const dbRef = firebase.database().ref('users/123');
        // const user = {
        //     'firstName': 'John',
        //     'lastName': 'Snow',
        //     'email': 'john.snow@email.com',
        //     'userId': '123'
        // };
        // dbRef.set(user);
    });

    return (
        <Box display='flex' flexDirection='column' className={classes.rootcss}>
            <Box>
                <Nav />
            </Box>

            <Box flexGrow={1}>
                <h2>My book here</h2>
            </Box>

            <Box flexShrink={0}>
                <BottomNav />
            </Box>
        </Box>
    );
};

export default Mybook;
