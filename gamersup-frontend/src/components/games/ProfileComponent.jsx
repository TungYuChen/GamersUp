import { useContext, useEffect } from "react";
import GamesContext from "../../context/games/GamesContext";
import UserContext from "../../context/user/UserContext";
import PropTypes from "prop-types";
import GameListItem from "./GameListItem";
import Loading from "../layout/Loading";

function ProfileComponent() {

    const {userName, userEmail} = useContext(UserContext);
    console.log(userName);

    return (
        <>
        <div className="avatar mt-8 justify-center">
          <div className="mb-2 w-36 h-36 mask mask-squircle">
            <img src="http://daisyui.com/tailwind-css-component-profile-1@94w.png" />            
          </div>          
        </div>
        <div className="justify-center flex">
          <h1 className="text-neutral-content py-1 text-3xl">{userName}</h1>
        </div>
        <div className="justify-center flex">
            <h1 className="inline-flex text-neutral-content py-1 text-2xl">User Email: &nbsp;&nbsp;</h1> <h1 className="inline-flex text-neutral-content py-1 text-2xl">{userEmail}</h1>
        </div>
        </>
    )

}






export default ProfileComponent;