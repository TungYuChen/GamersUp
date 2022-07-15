import { createContext, useReducer, useState } from 'react'
import reviewReducer from './ReviewReducer'
import axios from 'axios'

const ReviewContext = createContext()

const API_URL = process.env.REACT_APP_BACKEND_API_URL

export const ReviewProvider = ({ children }) => {
  const initialState = {
    reviews: [], // reviews of a specific game
    review: {},
    loading: true,
    error: false,
  }

  const [state, dispatch] = useReducer(reviewReducer, initialState)

  //Set loading
  const setLoading = () => dispatch({ type: 'LOADING' })

  // Add a new review to database
  const addReview = (userID, gameID, rating, comment) => {
    axios
      .post(`${API_URL}/reviews/user=${userID}`, {
        userID,
        gameID,
        rating,
        comment,
      })
      .then((response) => {
        //response.data
        console.log(response)
        dispatch({
          type: 'ADD_REVIEW',
          payload: response,
        })
      })
      .catch(() => {
        dispatch({
          type: 'REVIEW_ERROR',
        })
      })
  }

  const getReviewsByGameId = (gameID) => {
    setLoading()
    axios
      .get(`${API_URL}/reviews/game=${gameID}/all`)
      .then((response) => {
        //response.data
        // console.log(response.data)
        dispatch({
          type: 'GET_GAME_REVIEWS',
          payload: response.data,
        })
      })
      .catch(() => {
        dispatch({
          type: 'REVIEW_ERROR',
        })
      })
  }

  // Delete a post in database
  const deleteReview = async (reviewID) => {
    setLoading()
    if (window.confirm('Are you sure to delete this review?')) {
      axios
        .delete(`${API_URL}/reviews/review=${reviewID}`)
        .then(() => {
          const newReviews = state.reviews.filter(
            (item) => item.id !== reviewID
          )
          dispatch({
            type: 'GET_GAME_REVIEWS',
            payload: newReviews,
          })
        })
        .catch(() => {
          dispatch({
            type: 'REVIEW_ERROR',
          })
        })
    }
  }

  const editReview = (reviewID, newItem) => {
    return axios.put(`${API_URL}/reviews/review=${reviewID}`, newItem)
  }

  return (
    <ReviewContext.Provider
      value={{
        reviews: state.reviews,
        review: state.review,
        loading: state.loading,
        error: state.error,
        addReview,
        getReviewsByGameId,
        deleteReview,
        editReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  )
}

export default ReviewContext
