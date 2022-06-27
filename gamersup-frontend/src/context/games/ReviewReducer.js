const reviewReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_REVIEW':
      return {
        ...state,
        review: action.payload,
        loading: false,
      }
    case 'GET_GAME_REVIEWS':
      return {
        ...state,
        reviews: action.payload,
        loading: false,
      }
    case 'REVIEW_ERROR':
      return {
        ...state,
        error: true,
      }
    default:
      return state
  }
}

export default reviewReducer
