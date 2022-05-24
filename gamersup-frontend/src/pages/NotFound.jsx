import React from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='hero'>
      <div className='text-center hero-content'>
        <div className='max-w-lg'>
          <h1 className='text-7xl fontbold mb-10'>Sorry!</h1>
          <p className='text-5xl mb-10'>404 - Page not found!</p>
          <Link to='/' className='btn btn-secondary btn-lg'>
            <FaHome className='mr-2' />
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
