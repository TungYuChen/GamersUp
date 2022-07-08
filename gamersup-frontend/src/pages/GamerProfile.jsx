import { useContext, useEffect, React  } from "react";
import { Route } from "react-router-dom";
import GamesContext from "../context/games/GamesContext";
import UserContext from "../context/user/UserContext";
import GameListForProfile from "../components/profile/GameListForProfile";
import ProfileComponent from "../components/profile/ProfileComponent";
import Loading from "../components/layout/Loading";
import LoginForm from "../components/account/LoginForm";


// Multiple user view --> using variable as id and check
function GamerProfile() {

  const { isLoggedIn, user, getWantToPlayAndPlayedByGamerId} = useContext(UserContext);   

  useEffect(() => {
    getWantToPlayAndPlayedByGamerId(user.userID);
  }, [])

  if (isLoggedIn) {
         return (   
        <>
         <div className="card  bg-base-300 p-4 my-8">
          <ProfileComponent />      
        </div>
     
         <div>
          <GameListForProfile />
         </div>
        
        </>
      );
     
  } else {
    return <LoginForm />
  }
  
}

export default GamerProfile
