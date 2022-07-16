import React from 'react'
import SettingLikeGames from '../components/account/settings/SettingLikeGames'
import SettingProfile from '../components/account/settings/SettingProfile'

function Settings() {
  return (
    <>
      <h2 className='mt-5 text-center text-3xl font-bold text-info'>
        Settings
      </h2>
      <SettingProfile />

      <div className='hidden sm:block' aria-hidden='true'>
        <div className='py-5'>
          <div className='border-t border-gray-200' />
        </div>
      </div>

      <SettingLikeGames />
    </>
  )
}

export default Settings
