import React from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='hero'>
      <div className='text-center hero-content'>
        <div>
          <h1 className='text-5xl fontbold mb-10'>404 - PAGE NOT FOUND</h1>
          <p className='text-3xl mb-10'>Sorry, we cannot find the page that you request.</p>
          <Link to='/' className='btn btn-primary btn-lg'>
            <FaHome className='mr-2' />
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
