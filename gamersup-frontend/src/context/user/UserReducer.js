const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        userEmail: action.payload,
        loggedIn: true,
        error: false,
      }
    case 'LOGOUT':
      return {
        userEmail: '',
        loggedIn: false,
        error: false,
      }
    case 'CREDENTIAL_ERROR':
      return {
        userEmail: '',
        loggedIn: false,
        error: true,
      }
    default:
      return state
  }
}

export default userReducer
