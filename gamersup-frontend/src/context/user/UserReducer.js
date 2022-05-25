const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        userEmail: action.payload,
        loggedIn: true,
      }
    case 'LOGOUT':
      return {
        loggedIn: false,
      }
    default:
      return state
  }
}

export default userReducer
