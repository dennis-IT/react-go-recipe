import React, { useEffect, useRef, Fragment, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Box, makeStyles, Grid, Container, IconButton, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import SearchIcon from '@material-ui/icons/Search';
import Aos from 'aos';
import "aos/dist/aos.css";
import { gsap } from "gsap";
import clsx from 'clsx';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import Nav from '../components/Nav';
import BottomNav from '../components/BottomNav';
import RecipeCardCarousel from '../components/RecipeCardCarousel';
import FloatingButton from '../components/FloatingButton';
import * as actions from '../store/actions/index';

const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const LIMIT = 5;

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Home = (props) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
        heroContainer: {
            background: props.isDarkMode ? `url(${process.env.PUBLIC_URL}/media/heroD.jpg)` : `url(${process.env.PUBLIC_URL}/media/hero.jpg)`,
            height: '100vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: props.isDarkMode ? 'ivory' : '#4D4B4A'
        },
        heroContent: {
            height: '100vh',
            maxHeight: '100%',
            //width: '100vw',
            padding: '0 calc((100vw - 1300px)/2)',
        },
        heroItems: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: 'calc(100vh - 64px)',
            maxHeight: '100%',
            width: '600px',
            lineHeight: '1.3',
            fontWeight: 'bold',
            padding: '0 1.5rem',
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(5px)'
            },
        },
        heroH1: {
            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            //marginTop: '1rem',
            marginBottom: '1rem',
            boxShadow: '5px 5px #F5DF4D',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            paddingRight: '1.5rem'
        },
        heroP: {
            fontSize: 'clamp(1.2rem, 2vw, 2rem)',
            marginBottom: '1rem',
        },
        textField: {
            width: '10rem',
        },
        postHeroContent: {
            backgroundColor: '#fce5be'
        },
        postHeroItem: {
            fontSize: 'clamp(1.2rem, 1vw, 1.5rem)',
            color: props.isDarkMode ? 'ivory' : '#4D4B4A',
            backgroundClip: 'content-box',
            backgroundColor: props.isDarkMode ? 'grey' : '#f1f2f3',
            height: '4rem',
            padding: '0.3rem'
        },
        postHeroItemLeft: {
            [theme.breakpoints.down('sm')]: {
                paddingBottom: 0,
                paddingRight: '0.3rem'
            },
            [theme.breakpoints.up('sm')]: {
                paddingRight: 0
            }
        },
        postHeroItemRight: {
            [theme.breakpoints.down('sm')]: {
                paddingTop: 0,
                paddingLeft: '0.3rem'
            },
            [theme.breakpoints.up('sm')]: {
                paddingLeft: 0
            }
        },
        recipeCardCarousel: {
            marginTop: '4rem',
            marginBottom: '4rem'
        },
        carouselLeft: {
            background: props.isDarkMode ? `url(${process.env.PUBLIC_URL}/media/chefD.png)` : `url(${process.env.PUBLIC_URL}/media/chef.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '435px'
        },
        carouselRight: {
            //minHeight: '45vh'
        },
        carouselText: {
            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            fontWeight: 'bold',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: props.isDarkMode ? '#fbe0b3' : '#4D4B4A',
            textAlign: 'center',
            marginBottom: '2rem'
        },
        searchIcon: {
            transform: 'translate(-35px, -10px)'
        },
        img: {
            width: '50px'
        },
        featureHeader: {
            fontSize: '1.25rem',
            color: props.isDarkMode ? '#fbe0b3' : '#4D4B4A',
            fontWeight: 'bold'
        },
        featureContent: {
            fontSize: '1.1rem',
            color: props.isDarkMode ? 'ivory' : '#4D4B4A',
            textAlign: 'center',
            padding: '1rem'
        }
    }));

    const history = useHistory();
    const classes = useStyles();
    // let container = useRef(null);
    let heroH = useRef(null);
    let heroP = useRef(null);
    let heroInput = useRef(null);

    const [carouselError, setCarouselError] = useState(false);
    const [carouselErrorMessage, setCarouselErrorMessage] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setCarouselError(false);
    };

    useEffect(() => {
        //gsap.fromTo(container, { opacity: 0 }, { opacity: 1, duration: 1 });
        const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });
        tl.fromTo(heroH, { x: '-100%' }, { x: '0%', duration: 1 });
        tl.fromTo(heroP, { x: '100%' }, { x: '0%', duration: 1 }, '-=1');
        tl.fromTo(heroInput, { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1 });

        Aos.init({
            offset: 100,
            duration: 1000
        });
    }, []);

    const fetchData = (values, actions) => {
        actions.setSubmitting(true);
        Axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${values.recipe}&number=${LIMIT}&addRecipeInformation=true&offset=0`)
            .then(response => {
                const { data } = response;
                const { results, totalResults } = data;
                (totalResults > LIMIT) ? props.onRecipeSearch(values.recipe, results, totalResults, 0, true) : props.onRecipeSearch(values.recipe, results, totalResults, 0, false); //Redux, Reset offset & showMore                               
                setCarouselError(false);
                setCarouselErrorMessage('');
                actions.setSubmitting(false);
                history.push('/recipe');
            })
            .catch(error => {
                setCarouselError(true);
                setCarouselErrorMessage(error.response.data.message);
                actions.setSubmitting(false);
            });
    };

    //!NOTE: https://stackoverflow.com/questions/65307399/react-hooks-update-parent-component-without-triggering-infinite-loop
    //TODO: useCallback hook
    const checkCarouselError = useCallback(
        (status) => {
            setCarouselError(status);
        },
        [],
    );

    const checkCarouselErrorMessage = useCallback(
        (message) => {
            setCarouselErrorMessage(message);
        },
        [],
    );

    return (
        <Fragment>
            <Box className={classes.heroContainer}>
                <Nav />
                <Box className={classes.heroContent}>
                    <Box className={classes.heroItems}>
                        <div className={classes.heroH1} ref={element => heroH = element}>
                            Eat right. Live right.<br />
                            Cook together.
                        </div>
                        <div className={classes.heroP} ref={element => heroP = element}>
                            Everyone can be a master chief<br />
                            Pick up your recipe today
                        </div>
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
                                    <Form ref={element => heroInput = element}>
                                        <Box display='flex'>
                                            <Field
                                                component={TextField}
                                                color="primary"
                                                name='recipe'
                                                type='text'
                                                helperText='Tell us what you are looking for'
                                                placeholder='Steak, pizza,...'
                                            />

                                            <IconButton
                                                color='default'
                                                disabled={isSubmitting}
                                                onClick={submitForm}
                                                className={classes.searchIcon}
                                            >
                                                <SearchIcon />
                                            </IconButton>
                                        </Box>
                                    </Form>
                                )
                            }
                        </Formik>
                    </Box>
                </Box>
            </Box>

            <Grid container className={classes.postHeroContent} data-aos="fade-up">
                <Grid item xs={12} md={4} >
                    <Box textAlign='center' display='flex' justifyContent='center' alignItems='center' className={clsx(classes.postHeroItem, classes.postHeroItemLeft)}><i className="far fa-clock"></i>&nbsp;&nbsp;Save your time searching recipes</Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box textAlign='center' display='flex' justifyContent='center' alignItems='center' className={classes.postHeroItem}><i className="far fa-heart"></i>&nbsp;&nbsp;Stop wondering how to cook</Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box textAlign='center' display='flex' justifyContent='center' alignItems='center' className={clsx(classes.postHeroItem, classes.postHeroItemRight)}><i className="far fa-question-circle"></i>&nbsp;&nbsp;Know amount of calories per serving</Box>
                </Grid>
            </Grid>

            <Container maxWidth="lg" data-aos="fade-up">
                <Box className={classes.recipeCardCarousel}>
                    <div className={classes.carouselText}>
                        Our features
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <Box className={classes.featureIcon} display='flex' justifyContent='center' alignItems='center' mb={2}>
                                <img src={process.env.PUBLIC_URL + `/media/step1.png`} alt={`Search our recipe collection`} className={classes.img}></img>
                            </Box>
                            <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                                <div className={classes.featureHeader} >1. Search Our Recipes</div>
                                <div className={classes.featureContent} >We offer 5,000+ recipes. Let us know what you want to cook, and we are gladly sharing our help.</div>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Box className={classes.featureIcon} display='flex' justifyContent='center' alignItems='center' mb={2}>
                                <img src={process.env.PUBLIC_URL + `/media/step2.png`} alt={`Add recipe into your favorite`} className={classes.img}></img>
                            </Box>
                            <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                                <div className={classes.featureHeader}>2. Add To Your Favorite</div>
                                <div className={classes.featureContent}>Love a recipe? Register your account, and simply save the recipe in your favorite.</div>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Box className={classes.featureIcon} display='flex' justifyContent='center' alignItems='center' mb={2}>
                                <img src={process.env.PUBLIC_URL + `/media/step3.png`} alt={`Start cooking by following our instructions`} className={classes.img}></img>
                            </Box>
                            <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                                <div className={classes.featureHeader}>3. Follow Our Directions</div>
                                <div className={classes.featureContent}>By our step-by-step cooking instructions, it is easy to make your favorite recipe.</div>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Box className={classes.featureIcon} display='flex' justifyContent='center' alignItems='center' mb={2}>
                                <img src={process.env.PUBLIC_URL + `/media/step4.png`} alt={`Bon Appétit`} className={classes.img}></img>
                            </Box>
                            <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                                <div className={classes.featureHeader}>4. Enjoy Your Meal</div>
                                <div className={classes.featureContent}>This is time to invite your friends and beloved ones for lunch or dinner. Bon appetit!</div>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>

            <Container maxWidth="lg" data-aos="fade-up">
                <Box className={classes.recipeCardCarousel}>
                    <div className={classes.carouselText}>
                        Popular Recipes Today
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={5} className={classes.carouselLeft} >
                        </Grid>
                        <Grid item xs={12} md={7} className={classes.carouselRight}>
                            <RecipeCardCarousel onError={checkCarouselError} onErrorMessage={checkCarouselErrorMessage} />
                        </Grid>
                    </Grid>
                </Box>
            </Container>

            <FloatingButton />

            <Snackbar open={carouselError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {carouselErrorMessage}
                </Alert>
            </Snackbar>

            <BottomNav />
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        searchString: state.searchString,
        recipeData: state.recipeData,
        totalResults: state.totalResults,
        offset: state.offset,
        showMore: state.showMore,
        isDarkMode: state.darkModeEnable.isDarkMode
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRecipeSearch: (searchString, recipeData, totalResults, offset, showMore) => dispatch(actions.searchRecipe(searchString, recipeData, totalResults, offset, showMore))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
