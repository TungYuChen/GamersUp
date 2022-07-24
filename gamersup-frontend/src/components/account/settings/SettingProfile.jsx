import { React, useContext, useState } from 'react'
import UserContext from '../../../context/user/UserContext'
import AlertContext from '../../../context/alert/AlertContext'
import SettingAvatar from './SettingAvatar'
import SettingBday from './SettingBday'
import SettingBio from './SettingBio'
import SettingLevel from './SettingLevel'
import Alert from '../../layout/Alert'
import axios from 'axios'

function SettingProfile() {
  const { changeAvatar, changeLevel, changeBirthday, changeBio } =
    useContext(UserContext)
  const { setAlertWithTimeout } = useContext(AlertContext)

  const [img, setImgFile] = useState('')
  const [level, setLevel] = useState('')
  const [birthday, setBirthday] = useState(null)
  const [bio, setBio] = useState('')

  const handleSubmitProfile = () => {
    if (img !== '') {
      uploadAvatar(img)
    }
    if (level !== '') {
      changeLevel(level)
    }
    if (birthday !== null) {
      changeBirthday(birthday)
    }
    if (bio !== '') {
      changeBio(bio)
    }
    setAlertWithTimeout('Saved successfully!', 'information')
  }

  const uploadAvatar = async (imageSelected) => {
    const formData = new FormData()
    formData.append('file', imageSelected)
    formData.append('upload_preset', 'douglas_finalProject')

    axios
      .post('https://api.cloudinary.com/v1_1/mydouglasproject/upload', formData)
      .then((response) => {
        changeAvatar(response.data.url)
      })
      .catch((error) => {
        setAlertWithTimeout('The file size is too big!', 'information')
      })
  }

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

          <div className='mt-8 space-y-6'>
            <SettingAvatar setImgFile={setImgFile} />
            <SettingLevel setLevel={setLevel} />
            <SettingBday setBirthday={setBirthday} />
            <SettingBio setBio={setBio} />

            <div>
              <button
                type='submit'
                onClick={handleSubmitProfile}
                className='group relative w-40 mx-auto flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md btn btn-primary focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus'
              >
                Save
              </button>
              <Alert />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingProfile
