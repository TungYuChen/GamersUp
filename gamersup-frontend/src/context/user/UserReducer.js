const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload,
        loggedIn: true,
      }
    case 'LOGOUT':
      return {
        user: action.payload,
        loggedIn: false,
      }
    default:
      return state
  }
}

export default userReducer
