import { React, useState } from 'react'

function SettingBio({ setBio }) {
  const [text, setText] = useState('')

  const handleTextChange = (e) => {
    setText(e.target.value)
    setBio(e.target.value)
  }

  return (
    <div className='mb-10 pb-4'>
      <label className='block text-sm font-medium'>About Yourself</label>
      <div className='mt-5'>
        <input
          type='text'
          className='w-full pr-40 bg-gray-200 rounded h-14 text-black'
          placeholder='Brief description for your profile...'
          value={text}
          onChange={handleTextChange}
        />
      </div>
    </div>
  )
}

export default SettingBio
