import React, { useContext } from 'react'
import UserContext from '../../context/user/UserContext'
import FriendComponent from '../account/FriendComponent';
import Loading from './Loading';



function FriendList() {
    const { friends, getFriends, fetching} = useContext(UserContext);

    const friend1 = [];
    const friend2 = [];
    friend1['id'] = 1;
    friend2['id'] = 2;
    friend1['username'] = "James";
    friend2['username'] = "Aria";
    friend1['avatarUrl'] = "http://daisyui.com/tailwind-css-component-profile-1@94w.png";
    friend2['avatarUrl'] = "http://daisyui.com/tailwind-css-component-profile-1@94w.png";
    const friendHardCore = [];
    friendHardCore.push(friend1);
    friendHardCore.push(friend2);
    

    if (true) {
        getFriends();
        if (fetching) {
            return (
                <div className="float-right w-64 h-full">
                    <Loading />
                </div>
                );
        } else {
            return (
                <div className="float-right w-64 h-full">
                    { friendHardCore.map((friend) => {
                        // hardcore
                        <FriendComponent key={friend.id} friend={friend} />
                    })
                    }
                </div>
            )
         
        }
       
    } else {
        return ;
    }
}

export default FriendList;