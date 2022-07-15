import React from 'react'
import { useState } from 'react'

function LevelSelect ( {handleChange, tempLevel}) {

    const [ selectedLevel, setSelectedLevel ] = useState(tempLevel)

    const changeSelected = (e) => {
        setSelectedLevel(e.target.value);
        handleChange(e.target.value);
    }

    return (
        <ul className='grid grid-cols-1 gap-2' >
      <li>
        <input
          type='radio'
          id='newbie'
          name='level'
          value='0'
          onChange={changeSelected}
          checked={selectedLevel == 0}
        />
        <label htmlFor='newbie'>Newbie</label>
      </li>
      <li>
        <input
          type='radio'
          id='veteran'
          name='level'
          value='1'
          onChange={changeSelected}
          checked={selectedLevel == 1}
        />
        <label htmlFor='veteran'>Veteran</label>
      </li>
      <li>
        <input
          type='radio'
          id='pro'
          name='level'
          value='2'
          onChange={changeSelected}
          checked={selectedLevel == 2}
        />
        <label htmlFor='pro'>Pro</label>
      </li>    
     
    </ul>
    )

 
}

export default LevelSelect;