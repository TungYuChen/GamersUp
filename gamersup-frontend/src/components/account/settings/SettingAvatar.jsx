import React from 'react'

function SettingAvatar() {
  return (
    <div className='mb-10 pb-1'>
      <label className='block text-sm font-medium'>Upload your avatar</label>
      <div className='mt-5'>
        <div className='mt-1 flex items-center'>
          <span className='inline-block h-14 w-14 rounded-full overflow-hidden bg-gray-100'>
            <svg
              className='h-full w-full text-gray-300'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
            </svg>
          </span>
          <button
            type='button'
            className='btn ml-8 py-2 px-8 bg-secondary rounded-3xl shadow-sm text-base leading-4 font-medium text-gray-700 hover:bg-secondary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Change
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingAvatar
