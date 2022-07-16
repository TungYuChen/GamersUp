import React from 'react'

function SettingBio() {
  return (
    <div className='mb-10 pb-4'>
      <label className='block text-sm font-medium'>About Yourself</label>
      <div className='mt-5'>
        <input
          type='text'
          className='w-full pr-40 bg-gray-200 rounded h-14 text-black'
          placeholder='Brief description for your profile...'
        //   value={text}
        //   onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default SettingBio
