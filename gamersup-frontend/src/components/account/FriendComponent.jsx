import React from 'react'
import gamerAvatar from '../../images/gamers-logo.png'

function FriendComponent({ key, friend }) {
  return (
    <li className='w-48 rounded-full bg-base-300 mx-3 my-2 ' key={key}>
      <a href={'/profile/' + friend.userID}>
        {friend.avatarUrl !== null && (
          <img
            src={friend.avatarUrl}
            alt='Avatar'
            className='w-14 rounded-full avatar'
          />
        )}
        {friend.avatarUrl === null && (
          <img
            src={gamerAvatar}
            alt='avatar'
            className='w-14 rounded-full avatar'
          />
        )}
        <div className='my-auto text-base'>{friend.userName}</div>
      </a>
    </li>
  )
}

export default FriendComponent
