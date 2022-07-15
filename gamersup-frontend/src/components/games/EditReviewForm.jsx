import { React, useContext, useState, useEffect } from 'react'
import EditRatingSelect from './EditRatingSelect'
import ReviewContext from '../../context/games/ReviewContext'
import UserContext from '../../context/user/UserContext'
import PropTypes from 'prop-types'

function EditReviewForm({ gameId, itemEdit }) {
  const { editReview } = useContext(ReviewContext)
  const { user, isLoggedIn } = useContext(UserContext)

  const [text, setText] = useState('')
  const [rating, setRating] = useState(5)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (itemEdit.edit === true) {
      setBtnDisabled(false)
      setText(itemEdit.item.comment)
      setRating(itemEdit.item.rating)
    }
  }, [itemEdit])

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

  const handleSelectEdit = (selected) => {
    console.log(selected)
    setRating(selected)
  }

  const handleSubmit = (e) => {
    const reviewID = itemEdit.item.id
    const userID = user.userID
    const newItem = {
      id: reviewID,
      userID: userID,
      gameID: gameId,
      rating: rating,
      comment: text,
    }
    editReview(reviewID, newItem)
  }

  return (
    <div className='w-full rounded-lg shadow-lg review-card-edit bg-fuchsia-900'>
      <form onSubmit={handleSubmit}>
        <EditRatingSelect select={handleSelectEdit} itemEdit={itemEdit} />
        <div className='input-group text-neutral-content'>
          <input
            className='review-input bg-fuchsia-800 text-lg input input-bordered'
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

EditReviewForm.defaultProps = {
  itemEdit: { item: {}, edit: false },
}

EditReviewForm.propTypes = {
  itemEdit: PropTypes.object,
}

export default EditReviewForm
