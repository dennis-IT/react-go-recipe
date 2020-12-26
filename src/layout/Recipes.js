import React from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import uuid from 'react-uuid';
import { Container, makeStyles, Box, Grid, Typography, Button, LinearProgress } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import Nav from '../components/Nav';
import BottomNav from '../components/BottomNav';
import RecipeCard from '../components/RecipeCard';


const API_KEY = process.env.REACT_APP_API_KEY;
const LIMIT = 5;

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

// const Recipes = (props) => {
//     const classes = useStyles();
//     const [searchString, setSearchString] = useState('');
//     const [recipeData, setRecipeData] = useState(undefined);
//     const [totalResults, setTotalResults] = useState(0);
//     const [offset, setOffset] = useState(0);
//     const [showMore, setShowMore] = useState(true);

//     const fetchData = (values, actions) => {
//         actions.setSubmitting(true);
//         Axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${values.recipe}&number=${LIMIT}&addRecipeInformation=true&offset=0`)
//             .then(response => {
//                 const { data } = response;
//                 const { results, totalResults } = data;
//                 setSearchString(values.recipe);
//                 setRecipeData(results);
//                 setTotalResults(totalResults);
//                 setOffset(0);   //Reset offset
//                 (totalResults > LIMIT) ? setShowMore(true) : setShowMore(false); //Reset showMore

//                 // fOR REDUX
//                 props.onRecipeSearch();

//                 actions.setSubmitting(false);
//             });
//     };

//     const loadMore = () => {
//         const newOffset = offset + LIMIT;
//         const newShowMore = newOffset < totalResults - LIMIT;
//         Axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchString}&number=${LIMIT}&addRecipeInformation=true&offset=${newOffset}`)
//             .then(response => {
//                 const { data } = response;
//                 const { results } = data;
//                 setRecipeData([...recipeData, ...results]);
//                 setOffset(newOffset);
//                 setShowMore(newShowMore);
//             });
//     };

//     return (
//         <Box display='flex' flexDirection='column' className={classes.rootcss} >
//             <Box>
//                 <Nav />
//             </Box>
//             <Box flexGrow={1} mb={4}>
//                 <Container maxWidth="lg">
//                     <Box className={classes.topBanner} display='flex' justifyContent='center' alignItems='center'>
//                         <Typography variant='h3' className={classes.topBannerText}>
//                             Let's start cooking with GoRecipe today!
//                         </Typography>
//                     </Box>
//                     <Grid container>
//                         <Grid item xs={12} sm={3} className={classes.contentLeft}>
//                             <Formik
//                                 initialValues={{ recipe: '' }}
//                                 validate={(values) => {
//                                     const errors = {};
//                                     if (!values.recipe) {
//                                         errors.recipe = 'Required';
//                                     }
//                                     return errors;
//                                 }}
//                                 onSubmit={fetchData}
//                             >
//                                 {
//                                     ({ submitForm, isSubmitting, touched, errors }) => (
//                                         <Form>
//                                             <Box mb={1}>
//                                                 <Field
//                                                     component={TextField}
//                                                     variant="outlined"
//                                                     color="primary"
//                                                     name='recipe'
//                                                     type='text'
//                                                     label='Recipe'
//                                                     helperText='Ex: steak, pizza,...'
//                                                     fullWidth
//                                                 />
//                                             </Box>
//                                             {isSubmitting && <LinearProgress />}
//                                             <Box mt={1}>
//                                                 <Button
//                                                     variant='contained'
//                                                     color='primary'
//                                                     disabled={isSubmitting}
//                                                     onClick={submitForm}
//                                                     disableElevation
//                                                 >
//                                                     Search
//                                                 </Button>
//                                             </Box>
//                                         </Form>
//                                     )
//                                 }
//                             </Formik>
//                         </Grid>
//                         <Grid item xs={12} sm={9} className={classes.contentRight}>
//                             {
//                                 (recipeData === undefined) ? (
//                                     <div className={classes.preface} />
//                                 ) : (
//                                         (recipeData.length !== 0) ? (
//                                             <Box>
//                                                 <Grid container spacing={3} className={classes.contentRightRight}>
//                                                     {recipeData.map(recipe => (
//                                                         <Grid item>
//                                                             <RecipeCard key={uuid()} recipe={recipe} />
//                                                         </Grid>
//                                                     ))}
//                                                 </Grid>
//                                                 <Box display='flex' justifyContent='center' alignItems='center' mt={3}>
//                                                     {showMore && <Button variant='contained' color='primary' disableElevation onClick={loadMore}>Load More</Button>}
//                                                 </Box>
//                                             </Box>
//                                         ) : (
//                                                 <h2>No results</h2>
//                                             )
//                                     )
//                             }
//                         </Grid>
//                     </Grid>
//                 </Container>
//             </Box>
//             <Box flexShrink={0}>
//                 <BottomNav />
//             </Box>
//         </Box>
//     );
// };

//!NOTE: Redux test below


const Recipes = (props) => {
    const classes = useStyles();

    const fetchData = (values, actions) => {
        actions.setSubmitting(true);
        Axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${values.recipe}&number=${LIMIT}&addRecipeInformation=true&offset=0`)
            .then(response => {
                const { data } = response;
                const { results, totalResults } = data;
                (totalResults > LIMIT) ? props.onRecipeSearch(results, values.recipe, totalResults, 0, true) : props.onRecipeSearch(results, values.recipe, totalResults, 0, false); //Redux, Reset offset & showMore                
                actions.setSubmitting(false);
            });
    };

    const loadMore = () => {
        const newOffset = props.offset + LIMIT;
        const newShowMore = newOffset < props.totalResults - LIMIT;
        Axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${props.searchString}&number=${LIMIT}&addRecipeInformation=true&offset=${newOffset}`)
            .then(response => {
                const { data } = response;
                const { results } = data;
                props.onRecipeUpdate(results, newOffset, newShowMore);
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
                                                        <Grid item>
                                                            <RecipeCard key={uuid()} recipe={recipe} />
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                                <Box display='flex' justifyContent='center' alignItems='center' mt={3}>
                                                    {props.showMore && <Button variant='contained' color='primary' disableElevation onClick={loadMore}>Load More</Button>}
                                                </Box>
                                            </Box>
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

const mapStateToProps = state => {
    return {
        searchString: state.searchString,
        recipeData: state.recipeData,
        totalResults: state.totalResults,
        offset: state.offset,
        showMore: state.showMore
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRecipeSearch: (data, searchString, totalResults, offset, showMore) => dispatch({ type: 'SEARCH_RECIPE', getData: data, getSearchString: searchString, getTotalResults: totalResults, getOffset: offset, getShowMore: showMore }),
        onRecipeUpdate: (newData, newOffset, newShowMore) => dispatch({ type: 'UPDATE_RECIPE', updateData: newData, updateOffset: newOffset, updateShowMore: newShowMore })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
