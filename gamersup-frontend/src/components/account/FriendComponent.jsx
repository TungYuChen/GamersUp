import React from 'react'



function FriendComponent(friend) {
    return (
        <div className='.card grid grid-cols-3'>
            <img src={friend.avatarUrl} alt="No Avatar" className/>
            <div className='col-span-2'>
                <h1>{friend.userName}</h1>
            </div>
        </div>
    )
}

export default FriendComponent;