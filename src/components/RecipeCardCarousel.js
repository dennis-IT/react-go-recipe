import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { makeStyles, CircularProgress } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import data from '../data/random.json';
import RecipeCard from './RecipeCard';


const API_KEY = 'd2fa2131633f487797a21c036eba8df2';

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
    //const { history } = props;
    const classes = useStyles();
    const [recipeData, setRecipeData] = useState(undefined);

    useEffect(() => {
        Axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=10`)
            .then(response => {
                const { data } = response;
                const { recipes } = data;
                setRecipeData(recipes);
            });
        //setRecipeData(data);
    }, []);

    return (
        recipeData ? (
            <Carousel interval='5000' autoPlay={true} animation='slide' indicators={true} navButtonsAlwaysVisible={true}>
                {
                    recipeData.map(recipe => (
                        <RecipeCard recipe={recipe} />
                    ))
                }
            </Carousel>
        ) : (
                <div className={classes.loading}>
                    <div><CircularProgress classes={{ colorPrimary: classes.progress }} /></div>
                    <div><h3>Loading...</h3></div>
                </div>
            )
    );
};

export default RecipeCardCarousel;
