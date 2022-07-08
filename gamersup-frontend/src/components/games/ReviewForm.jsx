import { React, useContext, useState } from 'react'
import RatingSelect from './RatingSelect'
import ReviewContext from '../../context/games/ReviewContext'
import UserContext from '../../context/user/UserContext'

function ReviewForm({ gameId }) {
  const { addReview } = useContext(ReviewContext)
  const { user, isLoggedIn } = useContext(UserContext)

  const [text, setText] = useState('')
  const [rating, setRating] = useState(5)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const handleTextChange = (e) => {
    if (!isLoggedIn()) {
      setMessage('Please sign in to make a review.')
    } else if (text === '') {
      setBtnDisabled(true)
      setMessage(null)
    } else if (text !== '' && text.trim().length < 4) {
      setBtnDisabled(true)
      setMessage('Please enter at least 5 characters.')
    } else {
      setBtnDisabled(false)
      setMessage(null)
    }
    setText(e.target.value)
  }

  const handleSelectChange = (selected) => {
    console.log(selected)
    setRating(selected)
  }

  const handleSubmit = (e) => {
    addReview(user.userID, gameId, rating, text)
  }

  return (
    <div className='w-full rounded-lg shadow-lg review-card bg-base-300'>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate this game?</h2>
        <RatingSelect handleSelect={handleSelectChange} />
        <div className='input-group text-neutral-content'>
          <input
            className='review-input bg-base-100 text-lg input input-bordered'
            onChange={handleTextChange}
            type='text'
            placeholder='Write a review'
            value={text}
          />
          <button
            type='submit'
            className='btn btn-primary focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus'
            disabled={btnDisabled}
          >
            Send
          </button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </div>
  )
}

export default ReviewForm
