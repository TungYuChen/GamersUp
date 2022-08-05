import { useContext, useState, useEffect } from 'react'
import UserContext from '../../context/user/UserContext'
import gamerAvatar from '../../images/gamers-logo.png'
import { PlusCircleIcon, ThumbUpIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'

function FriendItemR({ userID, gamerID }) {
  const { getGamerById, isFriend, addFriend } = useContext(UserContext)
  const [gamer, setGamer] = useState({})
  const [friend, setFriend] = useState(false)

  useEffect(() => {
    getGamerById(gamerID)
      .then((response) => {
        setGamer(response.data)
      })
      .catch((error) => console.log(error))

    isFriend(userID, gamerID)
      .then((response) => {
        setFriend(response.data)
      })
      .catch((error) => console.log(error))
  }, [])

  const handleAdd = async () => {
    await addFriend(userID, gamerID)
  }

  return (
    <div className='card shadow-md compact side bg-base-100 my-3'>
      <div className='flex-row items-center space-x-4 card-body'>
        <div className='avatar rounded-full shadow w-14 h-14'>
          <Link to={`/profile/` + gamerID}>
            {gamer.avatarUrl !== null && (
              <img
                src={gamer.avatarUrl}
                alt='Avatar'
                className='w-14 rounded-full avatar'
              />
            )}
            {gamer.avatarUrl === null && (
              <img
                src={gamerAvatar}
                alt='avatar'
                className='w-14 rounded-full avatar'
              />
            )}
          </Link>
        </div>
        <div className='w-40'>
          <div className='flex'>
            <h2 className='card-title'>{gamer.userName}</h2>
            <div className='badge badge-success font-semibold ml-3 mt-1'>
              {(gamer.level === 0) && <span>Newbie</span>}
              {(gamer.level === 1) && <span>Veteran</span>}
              {(gamer.level === 2) && <span>Pro</span>}
              {(gamer.level == null) && <span>Unknown</span>}
            </div>
          </div>
          <p className='my-1'>{gamer.bio}</p>
          <div className='flex justify-between'>
            <div className='badge badge-accent font-bold mt-3'>
              <ThumbUpIcon className='inline mr-1 w-4' />
              {gamer.likes}
            </div>
            {friend && (
              <PlusCircleIcon className='btn btn-ghost btn-circle mr-1 w-8 text-primary' />
            )}
            {!friend && (
              <PlusCircleIcon
                className='btn btn-ghost btn-circle mr-1 w-8 hover:text-primary'
                onClick={handleAdd}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FriendItemR
