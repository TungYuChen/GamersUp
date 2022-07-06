import { React, useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import UserContext from '../../context/user/UserContext'
import GamesContext from '../../context/games/GamesContext'

function Navbar({ title }) {
  const { loggedIn, logout, isLoggedIn, getUserProfile } = useContext(UserContext)
  const { searchGames } = useContext(GamesContext)
  const [text, setText] = useState('')

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     getUserProfile(sessionStorage.getItem('authenticatedEmail'))
  //   }
  // }, [loggedIn])

  const handleChange = (e) => setText(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    //search games
    searchGames(text)
  }

  return (
    <nav className='navbar shadow-lg bg-base-300'>
      <div className='container mx-auto'>
        <div className='flex-none px-2 mx-2'>
          <Link to='/' className='text-4xl font-bold text-primary align-middle'>
            {title}
          </Link>
        </div>
        <div className='flex-1 px-2 mx-2 text-neutral-content'>
          <div className='flex justify-end'>
            <form className='form-control' onSubmit={handleSubmit}>
              <input
                type='text'
                className='w-full pr-10 mt-2 bg-base-100 text-lg input input-bordered'
                placeholder='Search for games...'
                value={text}
                onChange={handleChange}
              />
            </form>
            {!loggedIn && (
              <Link
                to='/login'
                className='btn btn-ghost btn-lg rounded-btn ml-3'
              >
                Sign In
              </Link>
            )}
            {loggedIn && (
              <Link to='/' className='btn btn-ghost btn-lg rounded-btn ml-3'>
                Chats
              </Link>
            )}
            {loggedIn && (
              <div className='w-12 rounded-full mt-2 mr-6'>
                <button className='btn btn-ghost btn-circle'>
                  <div className='indicator'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-7 w-7'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                      />
                    </svg>
                    <span className='badge badge-xs badge-error indicator-item'></span>
                  </div>
                </button>
              </div>
            )}
            {loggedIn && (
              <div className='dropdown dropdown-end'>
                <label tabIndex='0' className='btn btn-ghost btn-circle avatar'>
                  <div className='w-12 rounded-full mt-2'>
                    <img
                      src='https://api.lorem.space/image/face?hash=33791'
                      alt='avatar'
                    />
                  </div>
                </label>
                <ul
                  tabIndex='0'
                  className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 rounded-box w-40'
                >
                  {/* <li>
          <a className="justify-between">
            Notifications
            <span className="badge">New</span>
          </a>
        </li> */}
                  <li>
                    <Link to='/' className='text-lg'>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to='/' className='text-lg'>
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link to='/' className='text-lg' onClick={logout}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
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
