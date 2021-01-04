import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Container, Box, Grid, makeStyles, Typography, CircularProgress, IconButton, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Nav from '../components/Nav';
import BottomNav from '../components/BottomNav';
import Accord from '../components/Accord';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import * as actions from '../store/actions/index';

const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const DB_URL = process.env.REACT_APP_FIREBASE_DATABASEURL;

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

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
        marginTop: '0.75rem',
        marginBottom: '0.25rem',
        textAlign: 'center'
    },
    subtitleH: {
        color: '#676563',
        textTransform: 'capitalize',
        marginBottom: '0.25rem',
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

const RecipeDetails = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [recDetails, setRecDetails] = useState({ loading: true, results: {} });
    const { id } = useParams();
    const [favor, setFavor] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { token, userFavorite } = props;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false);
    };

    useEffect(() => {
        // onFetchUserFavorite(token, userId);
        if (token && userFavorite) {
            let found = null;
            userFavorite.forEach(recipe => {
                if (recipe.id === +id) {
                    return found = recipe;
                }
            });

            if (found) {
                setRecDetails(
                    {
                        loading: false,
                        results: found
                    }
                );
                setError(false);
                setErrorMessage('');
                setFavor(true);
            } else {
                Axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`)
                    .then(response => {
                        const { data } = response;
                        setRecDetails(
                            {
                                loading: false,
                                results: data
                            }
                        );
                        setError(false);
                        setErrorMessage('');
                    })
                    .catch(error => {
                        setError(true);
                        setErrorMessage(error.response.data.message);
                    });
            }
        } else {
            Axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`)
                .then(response => {
                    const { data } = response;
                    setRecDetails(
                        {
                            loading: false,
                            results: data
                        }
                    );
                    setError(false);
                    setErrorMessage('');
                })
                .catch(error => {
                    setError(true);
                    setErrorMessage(error.response.data.message);
                });
        }
    }, [id, token, userFavorite]);

    const handleFavorite = () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const url = `${DB_URL}/favorites/${userId}/${recDetails.results.id}.json?auth=${token}`;

        if (token) {
            Axios({
                method: !favor ? 'PATCH' : 'DELETE',
                url: url,
                data: recDetails.results
            })
                .then(response => {
                    setFavor(!favor);
                })
                .catch(error => {
                    setError(true);
                    setErrorMessage(error.response.data.message);
                });
        } else {
            setError(true);
            let count = 5;
            setErrorMessage(`Sign in is required. You will be directed to login page in ${count}s`);
            setInterval(() => {
                count--;
                setErrorMessage(`Sign in is required. You will be directed to login page in ${count}s`);
                if (count === 0) {
                    history.push('/login');
                }
            }, 1000);
        }
    };

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
                                    <img
                                        src={`${recDetails.results.image}`}
                                        alt={`${recDetails.results.title}`}
                                        className={classes.image}
                                        onError={(e) => {
                                            if (e.target.src !== `${process.env.PUBLIC_URL}/media/imgDefault.jpg`) {
                                                e.target.src = `${process.env.PUBLIC_URL}/media/imgDefault.jpg`;
                                            }
                                        }
                                        } />
                                    <Typography variant='h5' className={classes.titleH}>
                                        {recDetails.results.title}
                                    </Typography>
                                    <Typography variant='subtitle1' className={classes.subtitleH}>
                                        By {recDetails.results.sourceName}
                                    </Typography>
                                    <Box display='flex' justifyContent='center' alignItems='center' className={classes.icons}>
                                        <Box display='flex' justifyContent='center' alignItems='center'>
                                            <ScheduleIcon />
                                            <span>&nbsp;{recDetails.results.readyInMinutes} minutes</span>
                                        </Box>
                                        <Box display='flex' justifyContent='center' alignItems='center' mx={2}>
                                            <PeopleOutlineIcon />
                                            <span>&nbsp;{recDetails.results.servings}</span>
                                        </Box>
                                        <Box display='flex' justifyContent='center' alignItems='center'>
                                            <InfoOutlinedIcon />
                                            <span>&nbsp;{recDetails.results.nutrition.nutrients[0].amount}&nbsp;Cal</span>
                                        </Box>
                                    </Box>
                                    <Box display='flex' justifyContent='center' alignItems='center' className={classes.icons}>
                                        <Box>
                                            <IconButton color='secondary' onClick={handleFavorite}>
                                                {favor ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                            </IconButton>
                                        </Box>
                                        <Box style={{ fontStyle: 'italic' }}>
                                            {favor ? `Click to remove favorite` : `Click to add favorite`}
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Accord data={recDetails.results} />
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
        userFavorite: state.auth.userFavorite,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

// const mapDispatchToProps = dispatch => {
//     return {
//         onFetchUserFavorite: (token, userId) => dispatch(actions.getFavorite(token, userId))
//     };
// };

export default connect(mapStateToProps)(RecipeDetails);
