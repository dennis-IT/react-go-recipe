import * as actionTypes from './actionTypes';

export const searchCarousel = (carouselData) => {
    return {
        type: actionTypes.SEARCH_CAROUSEL,
        carouselData: carouselData
    };
};