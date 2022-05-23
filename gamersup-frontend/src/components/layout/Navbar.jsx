import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function Navbar({ title }) {
  return (
    <nav className='navbar shadow-lg bg-neutral'>
      <div className='container mx-auto'>
        <div className='flex-none px-2 mx-2'>
          <Link to='/' className='text-3xl font-bold text-primary align-middle'>
            {title}
          </Link>
        </div>
        <div className='flex-1 px-2 mx-2 text-neutral-content'>
          <div className='flex justify-end'>
            <Link to='/' className='btn btn-ghost btn-base rounded-btn'>
              Home
            </Link>
            <Link to='/about' className='btn btn-ghost btn-base rounded-btn'>
              about
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

Navbar.defaultProps = {
    title: 'Gamers Up',
  }
  
  Navbar.propTypes = {
    title: PropTypes.string,
  }

export default Navbar
