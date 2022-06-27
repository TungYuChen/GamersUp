import { React, useContext, useEffect } from 'react'
import ReviewItem from './ReviewItem'

function ReviewsList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <p className='flex place-content-center text-2xl my-4 font-bold my-8 text-center'>Leave the first review!</p>
  } else {
    return (
      <div className='feedback-list mt-8'>
        <h2 className='text-3xl my-4 font-bold card-title mb-8'>Latest Reviews</h2>
        {reviews?.map((item) => (
          <ReviewItem key={item.id} item={item} />
        ))}
      </div>
    )
  }
}

export default ReviewsList
