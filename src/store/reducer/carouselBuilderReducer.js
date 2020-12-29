import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    carouselData: []
};

const searchCarousel = (state, action) => {
    const updatedData = {
        carouselData: action.carouselData
    };
    return updateObject(state, updatedData);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_CAROUSEL: return searchCarousel(state, action);
        default: return state;
    }
};

export default reducer;