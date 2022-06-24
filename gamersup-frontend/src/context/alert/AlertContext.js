import { createContext, useReducer } from 'react'
import alertReducer from './AlertReducer'

const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
  const initialState = null

  const [state, dispatch] = useReducer(alertReducer, initialState)

  // Set an alert with timeout
  const setAlertWithTimeout = (msg, type) => {
    dispatch({
      type: 'SET_ALERT',
      payload: { msg, type },
    })
    setTimeout(() => dispatch({ type: 'REMOVE_ALERT' }), 5000)
  }

  // Set a static alert
  const setAlert = (msg, type) => {
    dispatch({
      type: 'SET_ALERT',
      payload: { msg, type },
    })
  }

  const removeAlert = () => {
    dispatch({
      type: 'REMOVE_ALERT',
    })
  }

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlertWithTimeout,
        setAlert,
        removeAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  )
}

export default AlertContext
