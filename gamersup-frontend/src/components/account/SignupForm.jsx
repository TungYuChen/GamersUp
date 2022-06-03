import { React, useContext, useState } from 'react'
import AlertContext from '../../context/alert/AlertContext'
import Alert from '../layout/Alert'
import { LockClosedIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/solid'

function SignupForm() {
  const { setAlert } = useContext(AlertContext)

  const [showPassword, setShowPassword] = useState(false)

  // Set loading spinner when loading the image
  // const [loading, setLoading] = useState(true)

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    if (e.target.username.value === '') {
      setAlert('Please enter your name', 'information')
    } else if (e.target.emailaddress.value === '') {
      setAlert('Please enter your email address', 'information')
    } else if (
      e.target.password.value === '' ||
      e.target.rpassword.value === ''
    ) {
      setAlert('Please enter your password', 'information')
    } else if (e.target.password.value.length < 8) {
      setAlert('Passwords must be at least 8 characters', 'information')
    } else if (e.target.password.value !== e.target.rpassword.value) {
      setAlert('Your passwords must match', 'information')
    }
  }

  return (
    <>
      <div className='flex place-content-center'>
        <Alert />
      </div>
      <div className='card card-side bg-base-100 shadow-xl w-1/2 mt-3 mb-3 mx-auto'>
        <figure>
          <img
            src='https://api.lorem.space/image/game?w=270&h=378'
            alt='game'
            className='rounded-md ml-5 mt-12'
          />
        </figure>

        <div className='card-body'>
          <h2 className='card-title mb-3'>Create your account</h2>
          <form onSubmit={handleSignupSubmit}>
            <div className='mb-5'>
              <label htmlFor='username' className='block text-sm font-medium'>
                Your name
              </label>
              <input
                type='text'
                name='username'
                required
                className='mt-1 focus:ring-primary-focus block w-full shadow-sm sm:text-sm border-primary rounded-md text-neutral'
              />
            </div>

            <div className='mb-5'>
              <label
                htmlFor='emailaddress'
                className='block text-sm font-medium'
              >
                Email address
              </label>
              <input
                type='email'
                name='emailaddress'
                required
                className='mt-1 focus:ring-primary-focus block w-full shadow-sm sm:text-sm border-primary rounded-md text-neutral'
              />
            </div>

            <div className='mb-5 relative rounded-md shadow-sm'>
              <label htmlFor='password' className='block text-sm font-medium'>
                Password
              </label>
              <div className='absolute inset-y-0 top-6 left-0 pl-3 flex items-center pointer-events-none'>
                <span className='text-gray-500 text-lg'>
                  <LockClosedIcon
                    className='h-4 w-4 text-secondary group-hover:text-secondary-focus'
                    aria-hidden='true'
                  />
                </span>
              </div>
              <input
                name='password'
                type={showPassword ? 'text' : 'password'}
                required
                className='block w-full mt-1 pl-10 pr-12 border-primary placeholder-gray-500 text-neutral rounded-md focus:outline-none focus:ring-primary-focus focus:border-primary-focus sm:text-sm'
              />
              <div className='absolute inset-y-0 top-6 right-3 flex items-center'>
                {showPassword ? (
                  <EyeIcon
                    className='h-4 w-4 text-secondary group-hover:text-secondary-focus'
                    aria-hidden='true'
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeOffIcon
                    className='h-4 w-4 text-secondary group-hover:text-secondary-focus'
                    aria-hidden='true'
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>

            <div className='mb-5 relative rounded-md shadow-sm'>
              <label htmlFor='rpassword' className='block text-sm font-medium'>
                Re-enter password
              </label>
              <div className='absolute inset-y-0 top-6 left-0 pl-3 flex items-center pointer-events-none'>
                <span className='text-gray-500 text-lg'>
                  <LockClosedIcon
                    className='h-4 w-4 text-secondary group-hover:text-secondary-focus'
                    aria-hidden='true'
                  />
                </span>
              </div>
              <input
                name='rpassword'
                type={showPassword ? 'text' : 'password'}
                required
                className='block w-full mt-1 pl-10 pr-12 border-primary placeholder-gray-500 text-neutral rounded-md focus:outline-none focus:ring-primary-focus focus:border-primary-focus sm:text-sm'
              />
              <div className='absolute inset-y-0 top-6 right-3 flex items-center'>
                {showPassword ? (
                  <EyeIcon
                    className='h-4 w-4 text-secondary group-hover:text-secondary-focus'
                    aria-hidden='true'
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeOffIcon
                    className='h-4 w-4 text-secondary group-hover:text-secondary-focus'
                    aria-hidden='true'
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>

            <button className='btn btn-primary w-full'>Sign Up</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignupForm
