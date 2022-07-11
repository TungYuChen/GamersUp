import React from 'react'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function EditRatingSelect({ select, itemEdit }) {
  const [editSelected, setEditSelected] = useState(5)

  useEffect(() => {
    setEditSelected(itemEdit.item.rating)
  }, [itemEdit])

  const handleEditChange = (e) => {
    //+:make the value a number
    setEditSelected(+e.currentTarget.value)
    select(+e.currentTarget.value)
    console.log('edit', editSelected)
  }

  return (
    <ul className='rating rating-ul'>
      <li>
        <input
          type='radio'
          id={`num1-${itemEdit.item.id}`}
          name='rating'
          value='1'
          onChange={handleEditChange}
          checked={editSelected === 1}
        />
        <label htmlFor={`num1-${itemEdit.item.id}`}>1</label>
      </li>
      <li>
        <input
          type='radio'
          id={`num2-${itemEdit.item.id}`}
          name='rating'
          value='2'
          onChange={handleEditChange}
          checked={editSelected === 2}
        />
        <label htmlFor={`num2-${itemEdit.item.id}`}>2</label>
      </li>
      <li>
        <input
          type='radio'
          id={`num3-${itemEdit.item.id}`}
          name='rating'
          value='3'
          onChange={handleEditChange}
          checked={editSelected === 3}
        />
        <label htmlFor={`num3-${itemEdit.item.id}`}>3</label>
      </li>
      <li>
        <input
          type='radio'
          id={`num4-${itemEdit.item.id}`}
          name='rating'
          value='4'
          onChange={handleEditChange}
          checked={editSelected === 4}
        />
        <label htmlFor={`num4-${itemEdit.item.id}`}>4</label>
      </li>
      <li>
        <input
          type='radio'
          id={`num5-${itemEdit.item.id}`}
          name='rating'
          value='5'
          onChange={handleEditChange}
          checked={editSelected === 5}
        />
        <label htmlFor={`num5-${itemEdit.item.id}`}>5</label>
      </li>
    </ul>
  )
}

EditRatingSelect.defaultProps = {
  itemEdit: { item: {}, edit: false },
}

EditRatingSelect.propTypes = {
  itemEdit: PropTypes.object,
}

export default EditRatingSelect
