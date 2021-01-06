import React, { useState } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Container, makeStyles, Box, Grid, Typography, Button, LinearProgress, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import Nav from '../components/Nav';
import BottomNav from '../components/BottomNav';
import RecipeCard from '../components/RecipeCard';
import FloatingButton from '../components/FloatingButton';
import * as actions from '../store/actions/index';

const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const LIMIT = 5;

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Recipes = (props) => {
    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
        rootcss: {
            minHeight: '100vh'
        },
        topBanner: {
            marginTop: '2rem',
            marginBottom: '2rem',
            height: '20vh',
            background: props.isDarkMode ? `url(${process.env.PUBLIC_URL}/media/bannerTopD.png)` : `url(${process.env.PUBLIC_URL}/media/bannerTop.jpg)`,
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
            color: props.isDarkMode ? 'ivory' : '#4D4B4A',
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
            background: props.isDarkMode ? `url(${process.env.PUBLIC_URL}/media/recipeSearchD.svg)` : `url(${process.env.PUBLIC_URL}/media/recipeSearch.svg)`,
            [theme.breakpoints.down('md')]: {
                height: '60vh',
            },
            [theme.breakpoints.up('md')]: {
                height: '30vh'
            },
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        },
        contentRightRight: {
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.down('md')]: {
                justifyContent: 'center'
            }
        }
    }));

    const classes = useStyles();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [onLoading, setOnLoading] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false);
    };

    const fetchData = (values, actions) => {
        actions.setSubmitting(true);
        Axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${values.recipe}&number=${LIMIT}&addRecipeInformation=true&offset=0`)
            .then(response => {
                const { data } = response;
                const { results, totalResults } = data;
                (totalResults > LIMIT) ? props.onRecipeSearch(values.recipe, results, totalResults, 0, true) : props.onRecipeSearch(values.recipe, results, totalResults, 0, false); //Redux, Reset offset & showMore                
                setError(false);
                setErrorMessage('');
                actions.setSubmitting(false);
            })
            .catch(error => {
                setError(true);
                setErrorMessage(error.response.data.message);
                actions.setSubmitting(false);
            });
    };

    const loadMore = () => {
        setOnLoading(true);
        const newOffset = props.offset + LIMIT;
        const newShowMore = newOffset < props.totalResults - LIMIT;
        Axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${props.searchString}&number=${LIMIT}&addRecipeInformation=true&offset=${newOffset}`)
            .then(response => {
                const { data } = response;
                const { results } = data;
                props.onRecipeUpdate(results, newOffset, newShowMore);
                setOnLoading(false);
                setError(false);
                setErrorMessage('');
            })
            .catch(error => {
                setOnLoading(false);
                setError(true);
                setErrorMessage(error.response.data.message);
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
                                initialValues={{ recipe: props.searchString !== '' ? props.searchString : '' }}
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
                                (props.recipeData === undefined) ? (
                                    <div className={classes.preface} />
                                ) : (
                                        (props.recipeData.length !== 0) ? (
                                            <Box>
                                                <Grid container spacing={3} className={classes.contentRightRight}>
                                                    {props.recipeData.map(recipe => (
                                                        <Grid item key={recipe.id}>
                                                            <RecipeCard key={recipe.id} recipe={recipe} />
                                                        </Grid>
                                                    ))}
                                                </Grid>

                                                <Box my={4}>
                                                    {onLoading && <LinearProgress />}
                                                </Box>

                                                <Box display='flex' justifyContent='center' alignItems='center' mt={3}>
                                                    {props.showMore && <Button variant='contained' color='primary' disableElevation onClick={loadMore}>Load More</Button>}
                                                </Box>
                                            </Box>
                                        ) : (
                                                <h2 style={{ color: props.isDarkMode ? 'ivory' : '#4D4B4A' }}>Sorry...No results</h2>
                                            )
                                    )
                            }
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <FloatingButton />

            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>

            <Box flexShrink={0}>
                <BottomNav />
            </Box>
        </Box>
    );
};

const mapStateToProps = state => {
    return {
        searchString: state.recipeBuilder.searchString,
        recipeData: state.recipeBuilder.recipeData,
        totalResults: state.recipeBuilder.totalResults,
        offset: state.recipeBuilder.offset,
        showMore: state.recipeBuilder.showMore,
        isDarkMode: state.darkModeEnable.isDarkMode
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRecipeSearch: (searchString, recipeData, totalResults, offset, showMore) => dispatch(actions.searchRecipe(searchString, recipeData, totalResults, offset, showMore)),
        onRecipeUpdate: (newRecipeData, newOffset, newShowMore) => dispatch(actions.updateRecipe(newRecipeData, newOffset, newShowMore))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
