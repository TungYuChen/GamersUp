import { React, useContext, useState, useEffect } from 'react'
import ReviewContext from '../../context/games/ReviewContext'
import UserContext from '../../context/user/UserContext'
import { FaTimes, FaEdit, FaStar, FaCommentDots, FaUser } from 'react-icons/fa'
import PropTypes from 'prop-types'

function ReviewItem({ item: { id, userID, rating, comment } }) {
  const { deleteReview, editReview } = useContext(ReviewContext)
  const { user, isLoggedIn, getGamerById } = useContext(UserContext)
  const [commenter, setCommenter] = useState()

  useEffect(() => {
    if (userID !== null) {
      getGamerById(userID).then((response) => {
        console.log(response)
        setCommenter(response.data)
      })
      // console.log('commenter', commenter)
    }
  }, [])

  return (
    <div className='w-full review-card bg-base-200'>
      <div className='num-display'>{rating}</div>
      <div className='mr-2 mb-2 text-gray-400'>
        <FaUser className='inline mr-1 w-5' /> {commenter?.userName}
      </div>
      {(isLoggedIn() && (user?.userID === commenter?.userID)) && (
        <>
          <button onClick={() => deleteReview(id)} className='close'>
            <FaTimes color='pink' />
          </button>
          <button onClick={() => editReview(id)} className='edit'>
            <FaEdit color='pink' />
          </button>
        </>
      )}
      <div className='text-display'>{comment}</div>
      <div
        className='
      flex justify-end'
      >
        <button className='hover:bg-primary mr-5 badge badge-warning badge-lg'>
          <FaStar className='mr-2' /> Starred &nbsp;
          <span className='font-semibold'>36</span>
        </button>
        <button className='hover:bg-primary mr-5 badge badge-success badge-lg'>
          <FaCommentDots className='mr-2' /> Comments &nbsp;
          <span className='font-semibold'>12</span>
        </button>
      </div>
    </div>
  )
}

ReviewItem.propTypes = {
  item: PropTypes.object,
}

export default ReviewItem
