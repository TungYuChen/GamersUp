import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import UserContext from '../../context/user/UserContext'
import FriendComponent from '../account/FriendComponent';
import Loading from './Loading';



function FriendList() {
    const { isLoggedIn, getFriends} = useContext(UserContext);
    const [ localFriends, setLocalFriends ] = useState();  
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {        
        getFriends().then(response => {
            console.log(response.data)
            setLocalFriends(response.data)
            setLoading(false);});          
    }, [localFriends])  

    
    

    if (isLoggedIn()) {        
        if (loading) {
            return (
                <div className="float-right w-64 h-full">
                    <Loading />
                </div>
                );
        } else {
            return (
                <div className="float-right w-64 h-full mt-8 ml-2">
                    <div className=" bg-base-300 p-2 drop-shadow-lg rounded-full "><h2 className="text-xl text-center">Friend List</h2></div>
                    <div id="friendListBody" className="grid grid-cols-1 bg-neutral pl-2 ">
                    { localFriends.map((friend) => 
                        // hardcore
                        <FriendComponent key={friend.gamerAId} friend={friend} />
                    )
                    }
                    </div>
                </div>
            )
         
        }
       
    } else {
        return null;
    }
}

export default FriendList;