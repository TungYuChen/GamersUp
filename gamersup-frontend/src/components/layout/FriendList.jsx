import { useContext, useState } from 'react'
import { useEffect } from 'react'
import UserContext from '../../context/user/UserContext'
import FriendComponent from '../account/FriendComponent'

function FriendList() {
  const { isLoggedIn, getFriends } = useContext(UserContext)
  const [localFriends, setLocalFriends] = useState()

  useEffect(() => {
    if (isLoggedIn) {
      getFriends().then((response) => {
        setLocalFriends(response.data)
      })
    }
  }, [localFriends])

  return (
    <>
      {localFriends?.map((friend, index) => (
        // hardcode
        <FriendComponent key={index} friend={friend} />
      ))}
    </>
  )
}

export default FriendList
