import React from 'react'

function SignupForm() {
  return (
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
        <form action=''>
          <div className='mb-5'>
            <label htmlFor='username' className='block text-sm font-medium'>
              Your name
            </label>
            <input
              type='text'
              name='username'
              id='username'
              className='mt-1 focus:ring-primary-focus block w-full shadow-sm sm:text-sm border-primary rounded-md text-neutral'
            />
          </div>

          <div className='mb-5'>
            <label htmlFor='emailaddress' className='block text-sm font-medium'>
              Email address
            </label>
            <input
              type='text'
              name='emailaddress'
              id='emailaddress'
              className='mt-1 focus:ring-primary-focus block w-full shadow-sm sm:text-sm border-primary rounded-md text-neutral'
            />
          </div>

          <div className='mb-5'>
            <label htmlFor='password' className='block text-sm font-medium'>
              Password
            </label>
            <input
              name='password'
              type='password'
              className='mt-1 focus:ring-primary-focus focus:border-primary-focus block w-full shadow-sm sm:text-sm border-primary rounded-md text-neutral'
            />
          </div>

          <div className='mb-5'>
            <label htmlFor='password' className='block text-sm font-medium'>
              Renter password
            </label>
            <input
              name='password'
              type='password'
              className='mt-1 focus:ring-primary-focus focus:border-primary-focus block w-full shadow-sm sm:text-sm border-primary rounded-md text-neutral'
            />
          </div>

          <button className='btn btn-primary w-full'>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default SignupForm
