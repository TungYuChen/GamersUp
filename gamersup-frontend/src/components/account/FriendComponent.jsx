import React from 'react'



function FriendComponent({key, friend}) {
    console.log(friend);
    return (
        <div className='.card grid grid-cols-3 rounded-full bg-base-300 mx-3 my-2 '>
            <img src={friend.avatarUrl} alt="No Avatar" />
            <div className='col-span-2 my-auto'>
                <h1>{friend.userName}</h1>
            </div>
        </div>
    )
}

export default FriendComponent;