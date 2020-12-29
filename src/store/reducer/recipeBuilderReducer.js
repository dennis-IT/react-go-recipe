import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    searchString: '',
    recipeData: undefined,
    totalResults: 0,
    offset: 0,
    showMore: true
};

const searchRecipe = (state, action) => {
    const updatedData = {
        searchString: action.searchString,
        recipeData: action.recipeData,
        totalResults: action.totalResults,
        offset: action.offset,
        showMore: action.showMore
    };
    return updateObject(state, updatedData);
};

const updateRecipe = (state, action) => {
    const updatedData = {
        recipeData: state.recipeData.concat(action.recipeData),
        offset: action.offset,
        showMore: action.showMore
    };
    return updateObject(state, updatedData);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_RECIPE: return searchRecipe(state, action);
        case actionTypes.UPDATE_RECIPE: return updateRecipe(state, action);
        default: return state;
    }
};

export default reducer;