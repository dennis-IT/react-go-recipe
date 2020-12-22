import React from 'react';
import { Container, makeStyles, Box, Grid, Typography } from '@material-ui/core';
import Nav from '../components/Nav';
import BottomNav from '../components/BottomNav';

const useStyles = makeStyles(theme => ({
    rootcss: {
        height: '100vh'
    },
    topBanner: {
        marginTop: '2rem',
        marginBottom: '2rem',
        height: '20vh',
        background: `url(${process.env.PUBLIC_URL}/media/bannerTop.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    topBannerText: {
        fontFamily: [
            '"Kaushan Script"',
            'cursive'
        ].join(','),
        fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)',
        fontWeight: 'bold',
        letterSpacing: '1.5px',
        color: '#4D4B4A',
        textAlign: 'center'
    }
}));

const Recipes = (props) => {
    const classes = useStyles();

    return (
        <Box display='flex' flexDirection='column' className={classes.rootcss} >
            <Box>
                <Nav />
            </Box>
            <Box flexGrow={1}>
                <Container maxWidth="lg">
                    <Box className={classes.topBanner} display='flex' justifyContent='center' alignItems='center'>
                        <Typography variant='h3' className={classes.topBannerText}>
                            Let's start cooking with GoRecipe today!
                        </Typography>
                    </Box>
                    <Grid container>
                        <Grid item xs={12} sm={3}>
                            <h3>Left</h3>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <h3>Right</h3>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box flexShrink={0}>
                <BottomNav />
            </Box>
        </Box>
    );
};

export default Recipes;
