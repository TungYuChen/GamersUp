import React from 'react'



function FriendComponent({key, friend}) {    
    return (
        <div className='.card grid grid-cols-3 rounded-full bg-base-300 mx-3 my-2 '>
            <a href={'/profile/' + friend.userID}>
            <img src={friend.avatarUrl} alt="No Avatar" />
            </a>
            <div className='col-span-2 my-auto'>
                <h1>{friend.userName}</h1>
            </div>
        </div>
    )
}

export default FriendComponent;