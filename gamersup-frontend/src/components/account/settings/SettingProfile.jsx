import React from 'react'
import SettingAvatar from './SettingAvatar'
import SettingBday from './SettingBday'
import SettingBio from './SettingBio'
import SettingLevel from './SettingLevel'

function SettingProfile() {
  const handleSubmitProfile = () => {}

  return (
    <>
      <div className='card bg-base-100 shadow-xl w-2/3 mt-3 mb-3 mx-auto'>
        <div className='card-body min-h-full px-20'>
          <div className='space-y-3'>
            <h2 className='card-title text-center text-2xl font-extrabold text-neutral-content'>
              Profile
            </h2>
            <p className='text-sm text-gray-300'>
              Your profile information will be displayed publicly so be careful
              with what you share.
            </p>
          </div>

          <form className='mt-8 space-y-6' onSubmit={handleSubmitProfile}>
            <SettingAvatar />
            <SettingLevel />
            <SettingBday />
            <SettingBio />

            <div>
              <button
                type='submit'
                className='group relative w-40 mx-auto flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md btn btn-primary focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus'
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SettingProfile
