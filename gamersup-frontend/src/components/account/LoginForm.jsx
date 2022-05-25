import { useContext, useState } from 'react'
import UserContext from '../../context/user/UserContext'
import { LockClosedIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'
import Home from '../../pages/Home'

function LoginForm() {
  const { checkUserCredentials, loggedIn } = useContext(UserContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    checkUserCredentials(email, password)
  }

  if (loggedIn) {
    return <Home />
  } else {
    return (
      <>
        <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
          <div className='max-w-md w-full space-y-8'>
            <div>
              <img
                className='mx-auto h-12 w-auto'
                src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                alt='Workflow'
              />
              <h2 className='mt-6 text-center text-3xl font-extrabold text-neutral-content'>
                Sign in to your account
              </h2>
              <p className='mt-2 text-center text-xl text-neutral-content'>
                OR{' '}
                <Link
                  to='/'
                  className='font-medium text-primary hover:text-primary-focus'
                >
                  create a new account
                </Link>
              </p>
            </div>
            <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
              <input type='hidden' name='remember' defaultValue='true' />
              <div className='rounded-md shadow-sm -space-y-px'>
                <div>
                  <label htmlFor='email-address' className='sr-only'>
                    Email address
                  </label>
                  <input
                    id='email-address'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-focus focus:border-primary-focus focus:z-10 text-lg'
                    placeholder='Email address'
                    onChange={handleEmailChange}
                  />
                </div>
                <div>
                  <label htmlFor='password' className='sr-only'>
                    Password
                  </label>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    required
                    className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-focus focus:border-primary-focus focus:z-10 text-lg'
                    placeholder='Password'
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    id='remember-me'
                    name='remember-me'
                    type='checkbox'
                    className='h-4 w-4 text-primary focus:ring-primary-focus border-primary-focus rounded'
                  />
                  <label
                    htmlFor='remember-me'
                    className='ml-2 block text-sm text-neutral-content'
                  >
                    Remember me
                  </label>
                </div>

                <div>
                  <Link
                    to='/'
                    className='text-base font-bold text-primary hover:text-primary-focus'
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md btn btn-primary focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus'
                >
                  <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                    <LockClosedIcon
                      className='h-5 w-5 text-secondary group-hover:text-secondary-focus'
                      aria-hidden='true'
                    />
                  </span>
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default LoginForm
