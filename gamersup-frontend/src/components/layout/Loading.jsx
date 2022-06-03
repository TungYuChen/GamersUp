import React from 'react'
import spinner from '../../images/spinner2.gif'

function Loading() {
  return (
    <div className='w-100 mt20'>
      <img
        src={spinner}
        alt='Loading...'
        width={180}
        className='text-center mx-auto'
      />
    </div>
  )
}

export default Loading
