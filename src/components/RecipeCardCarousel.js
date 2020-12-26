import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { makeStyles, CircularProgress, useTheme, useMediaQuery } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
//import data from '../data/random.json';
import RecipeCard from './RecipeCard';
import uuid from 'react-uuid';

const API_KEY = process.env.REACT_APP_API_KEY;
const LIMIT = 10;

const useStyles = makeStyles(theme => ({
    loading: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#4D4B4A'
    },
    progress: {
        color: '#86b2f3'
    }
}));

const RecipeCardCarousel = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (props.carouselData.length === 0) {
            Axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=${LIMIT}`)
                .then(response => {
                    const { data } = response;
                    const { recipes } = data;
                    props.onCarouselSearch(recipes);
                });
        }
        //props.onCarouselSearch(data);
    });

    return (
        (props.carouselData.length !== 0) ? (
            <Carousel interval='4000' autoPlay={true} animation='slide' indicators={true} navButtonsAlwaysVisible={!isMobile}>
                {
                    props.carouselData.map(recipe => (
                        <RecipeCard key={uuid()} recipe={recipe} />
                    ))
                }
            </Carousel>
        ) : (
                <div className={classes.loading}>
                    <div><CircularProgress classes={{ colorPrimary: classes.progress }} /></div>
                    <div><h3>Loading recipes...</h3></div>
                </div>
            )
    );
};

const mapStateToProps = state => {
    return {
        carouselData: state.carouselData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCarouselSearch: (data) => dispatch({ type: 'SEARCH_CAROUSEL', getCarouselData: data })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCardCarousel);
