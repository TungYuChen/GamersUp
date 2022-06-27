import { React, useContext } from 'react'
import axios from 'axios'
import AlertContext from '../../context/alert/AlertContext'

const API_URL = process.env.REACT_APP_BACKEND_API_URL

function ForgotPassword() {
  const { setAlert } = useContext(AlertContext)

  const resetPassword = (e) => {
    e.preventDefault()
    axios
      .post(`${API_URL}/account/reset_password`, {
        email: e.target.email.value,
      })
      .then((response) => {
        console.log(response)
        setAlert(
          'Please check your email inbox for your new password.',
          'information'
        )
      })
      .catch((err) => {
        setAlert('The email address does not exist.', 'error')
      })
  }

  return (
    <div className='card card-side bg-base-100 shadow-xl w-2/5 m-3 mx-auto'>
      <div className='min-h-full w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mx-auto'>
        <div className='max-w-md w-full space-y-8'>
          <div>
            <h2 className='text-center text-3xl font-bold text-neutral-content'>
              Password Reset Request
            </h2>
          </div>
          <form className='mt-8 space-y-6' onSubmit={resetPassword}>
            <div className='rounded-md shadow-sm space-y-px'>
              <div>
                <label
                  htmlFor='email-address'
                  className='text-sm font-semibold'
                >
                  Enter Your Email address
                </label>
                <input
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='mt-3 appearance-none rounded relative block w-full px-3 py-2 border border-primary placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-focus focus:border-primary-focus focus:z-10 text-lg'
                  placeholder='Email address'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='group relative w-50 mx-auto flex justify-center py-2 px-20 border border-transparent text-base font-medium rounded-full btn btn-primary focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
