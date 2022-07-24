import React from 'react'
import { useState, useEffect } from 'react'

function SettingAvatar({ setImgFile }) {

  const [selected, setSelected] = useState(null)
  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    if (selected) {
      setImgUrl(URL.createObjectURL(selected))
    }
  }, [selected])

  const handleChange = (e) => {
    setSelected(e.target.files[0])
    setImgFile(e.target.files[0])
  }

  return (
    <div className='mb-10 pb-1'>
      <label className='block text-sm font-medium'>Upload your avatar</label>
      <div className='mt-5'>
        <div className='mt-1 '>
          <input
            accept='image/*'
            type='file'
            id='select-image'
            style={{ display: 'none' }}
            onChange={handleChange}
          />
          <label htmlFor='select-image'>
            <span className='btn ml-2 py-2 px-8 bg-secondary rounded-3xl shadow-sm text-base leading-4 font-medium text-gray-700 hover:bg-secondary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
              Choose Avatar
            </span>
          </label>
        </div>
        {imgUrl && selected && (
          <div>
            <img
              className='mt-4 w-64 h-64 mask mask-squircle'
              src={imgUrl}
              alt='avatar'
            />
            <span className='text-sm mt-2 font-semibold text-gray-400'>
              {selected.name}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default SettingAvatar
