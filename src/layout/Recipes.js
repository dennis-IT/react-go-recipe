import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import uuid from 'react-uuid';
import { Container, makeStyles, Box, Grid, Typography, Button, LinearProgress, CircularProgress } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import Nav from '../components/Nav';
import BottomNav from '../components/BottomNav';
import RecipeCard from '../components/RecipeCard';

const API_KEY = process.env.REACT_APP_API_KEY;

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
    },
    contentLeft: {
        [theme.breakpoints.down('sm')]: {
            paddingRight: 0,
            paddingBottom: '1rem'
        },
        [theme.breakpoints.up('sm')]: {
            paddingRight: '1rem'
        }
    },
    contentRight: {
        // [theme.breakpoints.down('sm')]: {
        //     paddingLeft: 0,
        //     paddingTop: '0.5rem'
        // },
        // [theme.breakpoints.up('sm')]: {
        //     paddingLeft: '0.5rem'
        // }
    },
    loading: {
        height: '30vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#4D4B4A'
    },
    progress: {
        color: '#86b2f3'
    },
    preface: {
        background: `url(${process.env.PUBLIC_URL}/media/recipeSearch.jpg)`,
        [theme.breakpoints.down('md')]: {
            height: '60vh',
        },
        [theme.breakpoints.up('md')]: {
            height: '30vh'
        },
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    contentRightRight: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center'
        }
    }
}));


const Recipes = (props) => {
    const classes = useStyles();
    const [recipeData, setRecipeData] = useState(undefined);

    const fetchData = (values, actions) => {
        actions.setSubmitting(true);
        Axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${values.recipe}&number=10&addRecipeInformation=true`)
            .then(response => {
                const { data } = response;
                const { results } = data;
                setRecipeData(results);
                actions.setSubmitting(false);
            });
    };

    return (
        <Box display='flex' flexDirection='column' className={classes.rootcss} >
            <Box>
                <Nav />
            </Box>
            <Box flexGrow={1} mb={4}>
                <Container maxWidth="lg">
                    <Box className={classes.topBanner} display='flex' justifyContent='center' alignItems='center'>
                        <Typography variant='h3' className={classes.topBannerText}>
                            Let's start cooking with GoRecipe today!
                        </Typography>
                    </Box>
                    <Grid container>
                        <Grid item xs={12} sm={3} className={classes.contentLeft}>
                            <Formik
                                initialValues={{ recipe: '' }}
                                validate={(values) => {
                                    const errors = {};
                                    if (!values.recipe) {
                                        errors.recipe = 'Required';
                                    }
                                    return errors;
                                }}
                                onSubmit={fetchData}
                            >
                                {
                                    ({ submitForm, isSubmitting, touched, errors }) => (
                                        <Form>
                                            <Box mb={1}>
                                                <Field
                                                    component={TextField}
                                                    variant="outlined"
                                                    color="primary"
                                                    name='recipe'
                                                    type='text'
                                                    label='Recipe'
                                                    helperText='Ex: steak, pizza,...'
                                                    fullWidth
                                                />
                                            </Box>
                                            {isSubmitting && <LinearProgress />}
                                            <Box mt={1}>
                                                <Button
                                                    variant='contained'
                                                    color='primary'
                                                    disabled={isSubmitting}
                                                    onClick={submitForm}
                                                    disableElevation
                                                >
                                                    Search
                                                </Button>
                                            </Box>
                                        </Form>
                                    )
                                }
                            </Formik>
                        </Grid>
                        <Grid item xs={12} sm={9} className={classes.contentRight}>
                            {
                                (recipeData === undefined) ? (
                                    <div className={classes.preface} />
                                ) : (
                                        (recipeData.length !== 0) ? (
                                            <Grid container spacing={3} className={classes.contentRightRight}>
                                                {recipeData.map(recipe => (
                                                    <Grid item>
                                                        <RecipeCard key={uuid()} recipe={recipe} />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        ) : (
                                                <h2>No results</h2>
                                            )
                                    )
                            }
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
