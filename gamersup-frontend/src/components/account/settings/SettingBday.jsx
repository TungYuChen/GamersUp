import { React, useState } from 'react'
import DatePicker from 'react-datepicker'

function SettingBday({ setBirthday }) {
  const [newBirthday, setNewBirthDay] = useState()

  const handleChangeBd = async (newDate) => {
    setBirthday(newDate)
    setNewBirthDay(newDate)
  }

  return (
    <div className='mb-10 pb-4'>
      <label className='block text-sm font-medium'>Your Birthday</label>
      <div className='mt-5 relative'>
        <DatePicker
          className='w-full pr-40 bg-gray-200 rounded h-14 text-black'
          selected={newBirthday}
          id='datepicker'
          onChange={(newDate) => handleChangeBd(newDate)}
          showYearDropdown 
        />
      </div>
    </div>
  )
}

export default SettingBday
