import { React, useContext, useState } from 'react'
import UserContext from '../../context/user/UserContext'




function ProfileCard() {
    const {userName, userEmail} = useContext(UserContext);
    var imageSource = "...";

    return (
        <>
            <div className='card w-72 bg-base-200 shadow-xl'>
                <img src={imageSource} alt='No Profile' className=''></img>
                <h2>{userName}</h2><br/>
                <h3>Email: {userEmail}</h3><br/>                
            </div>            
        </>
    )
}