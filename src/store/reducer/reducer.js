const initialState = {
    searchString: '',
    recipeData: undefined,
    totalResults: 0,
    offset: 0,
    showMore: true,
    carouselData: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH_CAROUSEL':
            return {
                ...state,
                carouselData: action.getCarouselData
            };
        case 'SEARCH_RECIPE':
            return {
                ...state,
                searchString: action.getSearchString,
                recipeData: action.getData,
                totalResults: action.getTotalResults,
                offset: action.getOffset,
                showMore: action.getShowMore
            };
        case 'UPDATE_RECIPE':
            return {
                ...state,
                recipeData: state.recipeData.concat(action.updateData),
                offset: action.updateOffset,
                showMore: action.updateShowMore
            };
        default:
            return state;
    }
};

export default reducer;

