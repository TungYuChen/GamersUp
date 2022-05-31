import { useContext } from 'react'
import UserContext from '../../context/user/UserContext'
import AlertContext from '../../context/alert/AlertContext'
import { LockClosedIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'
import Home from '../../pages/Home'
import Alert from '../layout/Alert'

function LoginForm() {
  const { setAlert } = useContext(AlertContext)

  const { checkUserCredentials, loggedIn, error } = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    checkUserCredentials(email, password)
    if (error) {
      setAlert('Wrong credentials. Please try your email and password again.', 'error')
    }
  }

  if (loggedIn) {
    return <Home />
  } else {
    return (
      <>
        <div className='flex place-content-center'>
          <Alert />
        </div>
        <div className='card card-side bg-base-100 shadow-xl w-1/2 mt-3 mb-3 mx-auto'>
          <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mx-auto'>
            <div className='max-w-md space-y-8'>
              <div>
                <h2 className='text-center text-3xl font-extrabold text-neutral-content'>
                  Sign in to your account
                </h2>
                <p className='mt-2 text-center text-xl text-neutral-content'>
                  OR{' '}
                  <Link
                    to='/signup'
                    className='font-medium text-primary hover:text-primary-focus'
                  >
                    create a new account
                  </Link>
                </p>
              </div>
              <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                <input type='hidden' name='remember' defaultValue='true' />
                <div className='rounded-md shadow-sm space-y-px'>
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
                      className='appearance-none rounded-none relative block w-full px-3 py-2 border border-primary placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-focus focus:border-primary-focus focus:z-10 text-lg'
                      placeholder='Email address'
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
                      className='appearance-none rounded-none relative block w-full px-3 py-2 border border-primary placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-focus focus:border-primary-focus focus:z-10 text-lg'
                      placeholder='Password'
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
                      to='/forgotpassword'
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
        </div>
      </>
    )
  }
}

export default LoginForm
