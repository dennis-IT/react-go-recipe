import * as actionTypes from './actionTypes';

export const searchRecipe = (searchString, recipeData, totalResults, offset, showMore) => {
    return {
        type: actionTypes.SEARCH_RECIPE,
        searchString: searchString,
        recipeData: recipeData,
        totalResults: totalResults,
        offset: offset,
        showMore: showMore
    };
};

export const updateRecipe = (recipeData, offset, showMore) => {
    return {
        type: actionTypes.UPDATE_RECIPE,
        recipeData: recipeData,
        offset: offset,
        showMore: showMore
    };
};