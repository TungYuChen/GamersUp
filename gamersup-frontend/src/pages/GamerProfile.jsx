import { useContext, useEffect, React  } from "react";
import { Route } from "react-router-dom";
import GamesContext from "../context/games/GamesContext";
import UserContext from "../context/user/UserContext";
import GameListForProfile from "../components/games/GameListForProfile";
import ProfileComponent from "../components/games/ProfileComponent";
import Loading from "../components/layout/Loading";
import LoginForm from "../components/account/LoginForm";

function GamerProfile() {

  const { reading, user, isLoggedIn, getLoggedUserInSession} = useContext(UserContext);   
  const { getGamesWantToPlayAndGamesPlayedById } = useContext(GamesContext);
  //useEffect
  useEffect(() => {      
    getLoggedUserInSession(); 
    console.log(user);
    getGamesWantToPlayAndGamesPlayedById(user.userID);
           
  }, []);


  if (isLoggedIn) {
    if (reading) {
      return <Loading />
    } else {
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
    } 
  } else {
    return <Route path='/login' element={<LoginForm />}/>
  }
  
}

export default GamerProfile
