import { React, useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import UserContext from '../../context/user/UserContext'
import GamesContext from '../../context/games/GamesContext'
import gamerAvatar from '../../images/gamers-logo.png'
import FriendList from './FriendList'

function Navbar({ title }) {
  const { isLoggedIn, logout, getLoggedUserInSession, user } =
    useContext(UserContext)
  const { searchGames } = useContext(GamesContext)
  const [text, setText] = useState('')

  useEffect(() => {
    // get the logged user
    getLoggedUserInSession()
  }, [isLoggedIn()])

  const handleChange = (e) => setText(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    //search games
    searchGames(text)
  }

  const openChatRoom = (e) => {
    window.open("http://localhost:4200/chatRoom");
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
            {!isLoggedIn() && (
              <Link
                to='/login'
                className='btn btn-ghost btn-lg rounded-btn ml-3'
              >
                Sign In
              </Link>
            )}
            {isLoggedIn() && (
              <div className='w-12 rounded-full mt-2 ml-3'>
                <button className='btn btn-ghost btn-circle'>
                  <Link
                    to={`/recommendations/${
                      JSON.parse(sessionStorage.getItem('user')).userID
                    }`}
                    className='indicator'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    <span className='badge badge-xs badge-error indicator-item'></span>
                  </Link>
                </button>
              </div>
            )}
            {isLoggedIn() && (
              <div className='dropdown dropdown-end'>
                <label
                  tabIndex='0'
                  className='btn btn-ghost btn-lg rounded-btn'
                >
                  Friends
                </label>
                <ul
                  tabIndex='0'
                  className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 rounded-box w-60'
                >
                  <FriendList />
                </ul>
              </div>
            )}
            {isLoggedIn() && (
              <div className='w-12 rounded-full mt-2 mr-3'>
                <button className='btn btn-ghost btn-circle'>
                  <Link to='/chatRoom' className='indicator'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
                      />
                    </svg>
                  </Link>
                </button>
              </div>
            )}
            {isLoggedIn() && (
              <div className='dropdown dropdown-end'>
                <label tabIndex='0' className='btn btn-ghost btn-circle avatar'>
                  <div className='w-12 rounded-full mt-2'>
                    {user.avatarUrl !== null && (
                      <img src={user.avatarUrl} alt='avatar' />
                    )}
                    {user.avatarUrl === null && (
                      <img src={gamerAvatar} alt='avatar' />
                    )}
                  </div>
                </label>
                <ul
                  tabIndex='0'
                  className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 rounded-box w-40'
                >
                  <li>
                    <Link
                      to={`/profile/${
                        JSON.parse(sessionStorage.getItem('user')).userID
                      }`}
                      className='text-lg'
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to='/settings' className='text-lg'>
                      Settings
                    </Link>
                  </li>                
                  <li>
                    <div className='text-lg' onClick={logout}>
                      Logout
                    </div>
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
