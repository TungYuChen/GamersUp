import { useContext, useEffect, React  } from "react";
import UserContext from "../context/user/UserContext";
import GameListForProfile from "../components/profile/GameListForProfile";
import ProfileComponent from "../components/profile/ProfileComponent";
import LoginForm from "../components/account/LoginForm";
import Loading from "../components/layout/Loading";


// Multiple user view --> using variable as id and check
function GamerProfile() {

  const { isLoggedIn, user, getWantToPlayByGamerId, getPlayedByGamerId, reading, fetching} = useContext(UserContext);    

  useEffect(() => {    
    getWantToPlayByGamerId(user.userID);
    getPlayedByGamerId(user.userID);
  }, [])

  if (reading || fetching) {
    return <Loading />
  } else {
    if (isLoggedIn()) {
      return (   
     <>
      <div className="card  bg-base-300 p-4 my-8">
       <ProfileComponent theUser={user}/>      
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
  
  
}

export default GamerProfile
