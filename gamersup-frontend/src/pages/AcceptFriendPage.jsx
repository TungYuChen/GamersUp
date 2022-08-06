import {useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../context/user/UserContext";

function AcceptFriendPage () {
    const { acceptFriend } = useContext(UserContext);    
    const params = useParams();

    useEffect(() => {
        acceptFriend(params.idA, params.idB);
    })


    return (
        <h1 className="text-4xl">You accept the friend request!</h1>
    )
} 

export default AcceptFriendPage
