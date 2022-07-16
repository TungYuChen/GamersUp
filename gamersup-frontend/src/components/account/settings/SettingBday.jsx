import { React, useContext, useState } from 'react'
import DatePicker from 'react-datepicker'
import UserContext from '../../../context/user/UserContext'

function SettingBday() {
  const { user, changeBirthday } = useContext(UserContext)
  const [newBirthday, setNewBirthDay] = useState(new Date())

//   const uploadBirthday = async (e) => {
//     changeBirthday(newBirthday)
//   }

  return (
    <div className='mb-10 pb-4'>
      <label className='block text-sm font-medium'>Your Birthday</label>
      <div className='mt-5 relative'>
        <DatePicker
          className='w-full pr-40 bg-gray-200 rounded h-14 text-black'
          selected={new Date(newBirthday)}
          id='datepicker'
          onChange={(newDate) => setNewBirthDay(new Date(newDate))}
        />
        {/* <button
          type='submit'
          onClick={uploadBirthday}
          className='absolute top-0 right-0 rounded-l-none w-40 btn btn-lg bg-secondary'
        >
          Submit
        </button> */}
      </div>
    </div>
  )
}

export default SettingBday
