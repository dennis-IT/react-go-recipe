import React from 'react';
import { Box, makeStyles, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    hero: {
        minHeight: '100vh',
        background: `url(${process.env.PUBLIC_URL}/media/hero.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }
}));

const Home = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Box className={classes.hero}>

            </Box>
            <Box>
                Heloo
            </Box>
        </React.Fragment>
    );
};

export default Home;
