import { React, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { LockClosedIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/solid'
import Alert from '../layout/Alert'
import AlertContext from '../../context/alert/AlertContext'

function ResetPassword() {
  const { setAlert } = useContext(AlertContext)

  const [showPassword, setShowPassword] = useState(false)

  const handleResetSubmit = (e) => {
    e.preventDefault()
    if (e.target.newpassword.value.length < 8) {
      setAlert('Passwords must be at least 8 characters', 'information')
    } else if (e.target.newpassword.value !== e.target.passwordconfirm.value) {
      setAlert('Your passwords must match', 'information')
    }
  }

  return (
    <>
      <div className='flex place-content-center'>
        <Alert />
      </div>
      <div className='card card-side bg-base-100 shadow-xl w-2/5 m-3 mx-auto'>
        <div className='min-h-full w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mx-auto'>
          <div className='max-w-md w-full space-y-8'>
            <div>
              <h2 className='text-center text-3xl font-bold text-neutral-content'>
                Reset Your Password
              </h2>
            </div>
            <form className='mt-8 space-y-6' onSubmit={handleResetSubmit}>
              <div className='rounded-md shadow-sm space-y-px'>
                <div className='mb-2 relative rounded-md shadow-sm'>
                  <div className='absolute inset-y-0 top-5 left-0 pl-3 flex items-center pointer-events-none'>
                    <span className='text-gray-500 text-lg'>
                      <LockClosedIcon
                        className='h-5 w-5 text-secondary group-hover:text-secondary-focus'
                        aria-hidden='true'
                      />
                    </span>
                  </div>
                  <label
                    htmlFor='newpassword'
                    className='text-sm font-semibold'
                  >
                    New Password
                  </label>
                  <input
                    name='newpassword'
                    type={showPassword ? 'text' : 'password'}
                    required
                    className='block w-full pl-10 pr-12 border-primary placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-focus focus:border-primary-focus focus:z-10 text-lg'
                  />
                  <div className='absolute inset-y-0 top-5 right-3 flex items-center'>
                    {showPassword ? (
                      <EyeIcon
                        className='h-5 w-5 text-secondary group-hover:text-secondary-focus'
                        aria-hidden='true'
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <EyeOffIcon
                        className='h-5 w-5 text-secondary group-hover:text-secondary-focus'
                        aria-hidden='true'
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                </div>

                <div className='mb-2 relative rounded-md shadow-sm'>
                  <div className='absolute inset-y-0 top-5 left-0 pl-3 flex items-center pointer-events-none'>
                    <span className='text-gray-500 text-lg'>
                      <LockClosedIcon
                        className='h-5 w-5 text-secondary group-hover:text-secondary-focus'
                        aria-hidden='true'
                      />
                    </span>
                  </div>
                  <label
                    htmlFor='passwordconfirm'
                    className='text-sm font-semibold'
                  >
                    New Password Confirmation
                  </label>
                  <input
                    name='passwordconfirm'
                    type={showPassword ? 'text' : 'password'}
                    required
                    className='block w-full pl-10 pr-12 border-primary placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-focus focus:border-primary-focus focus:z-10 text-lg'
                  />
                  <div className='absolute inset-y-0 top-5 right-3 flex items-center'>
                    {showPassword ? (
                      <EyeIcon
                        className='h-5 w-5 text-secondary group-hover:text-secondary-focus'
                        aria-hidden='true'
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <EyeOffIcon
                        className='h-5 w-5 text-secondary group-hover:text-secondary-focus'
                        aria-hidden='true'
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className='flex justify-center'>
                <div>
                  <button
                    type='submit'
                    className='group relative w-auto mx-5 px-10 border border-transparent text-base font-medium rounded btn btn-primary focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus'
                  >
                    Reset
                  </button>
                </div>
                <div>
                  <Link to='/' className='group relative w-auto mx-5 px-10 border border-transparent text-base font-medium rounded btn btn-neutral focus:ring-2 focus:ring-offset-2 focus:ring-neutral-focus'>Cancel</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
