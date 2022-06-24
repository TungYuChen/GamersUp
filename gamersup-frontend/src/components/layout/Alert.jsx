import { useContext } from 'react'
import AlertContext from '../../context/alert/AlertContext'
import warning from '../../images/warning-error.png'
import information from '../../images/information-icon.png'

function Alert() {
  const { alert } = useContext(AlertContext)

  return (
    alert !== null && (
      <div className='flex place-content-center'>
        <p className='flex items-start mt-4 space-x-2'>
          {alert.type === 'error' && (
            <img src={warning} alt='warning' width={30} />
          )}
          {alert.type === 'information' && (
            <img src={information} alt='information' width={30} />
          )}
          <p className='flex-1 text-sm mt-2 text-warning'>
            <strong>{alert.msg}</strong>
          </p>
        </p>
      </div>
    )
  )
}

export default Alert
