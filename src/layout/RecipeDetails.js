import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { Container, Box, Grid, makeStyles, Typography, CircularProgress } from '@material-ui/core';
import Nav from '../components/Nav';
import BottomNav from '../components/BottomNav';
import Accord from '../components/Accord';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import info from '../data/information.json';

const API_KEY = process.env.REACT_APP_API_KEY;

const useStyles = makeStyles((theme) => ({
    rootcss: {
        height: '100vh'
    },
    image: {
        maxWidth: '100%'
    },
    titleH: {
        color: '#565553',
        textTransform: 'capitalize',
        margin: '0.75rem 0'
    },
    subtitleH: {
        color: '#676563',
        textTransform: 'capitalize',
        marginBottom: '0.75rem',
    },
    icons: {
        color: '#676563',
        textTransform: 'capitalize',
    },
    loading: {
        color: '#4D4B4A'
    },
    progress: {
        color: '#86b2f3'
    }
}));

const RecipeDetails = () => {
    const classes = useStyles();
    const [recDetails, setRecDetails] = useState({ loading: true, results: {} });
    const { id } = useParams();

    // useEffect(() => {
    //     Axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`)
    //         .then(response => {
    //             const { data } = response;
    //             setRecDetails(data);
    //             console.log(recDetails);
    //         });
    // }, [id]);

    useEffect(() => {
        setRecDetails(
            {
                loading: false,
                results: info
            }
        );
        //console.log(recDetails.results);
    }, [recDetails.results]);

    return (
        <Box display='flex' flexDirection='column' className={classes.rootcss} >
            <Box>
                <Nav />
            </Box>

            <Box flexGrow={1} mb={4} my={3}>
                <Container maxWidth="lg">
                    {!recDetails.loading ? (
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                                    <img src={`${recDetails.results.image}`} alt={`${recDetails.results.title}`} className={classes.image} />
                                    <Typography variant='h5' className={classes.titleH}>
                                        {recDetails.results.title}
                                    </Typography>
                                    <Typography variant='subtitle1' className={classes.subtitleH}>
                                        By {recDetails.results.sourceName}
                                    </Typography>
                                    <Box display='flex' justifyContent='center' alignItems='center' className={classes.icons}>
                                        <Box display='flex' justifyContent='center' alignItems='center' mx={1}>
                                            <ScheduleIcon />
                                            <span>&nbsp;{recDetails.results.readyInMinutes} minutes</span>
                                        </Box>
                                        <Box display='flex' justifyContent='center' alignItems='center' mx={1}>
                                            <PeopleOutlineIcon />
                                            <span>&nbsp;{recDetails.results.servings}</span>
                                        </Box>
                                        <Box display='flex' justifyContent='center' alignItems='center' mx={1}>
                                            <InfoOutlinedIcon />
                                            <span>&nbsp;{recDetails.results.nutrition.nutrients[0].amount}&nbsp;{recDetails.results.nutrition.nutrients[0].unit}</span>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Accord />
                            </Grid>
                        </Grid>
                    ) : (
                            <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' className={classes.loading}>
                                <Box my={2}><CircularProgress classes={{ colorPrimary: classes.progress }} /></Box>
                                <div><h3>Loading recipe details...</h3></div>
                            </Box>
                        )}
                </Container>
            </Box>

            <Box flexShrink={0}>
                <BottomNav />
            </Box>
        </Box>
    );
};

export default RecipeDetails;
