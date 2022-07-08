import { useContext, useEffect } from "react";
import GamesContext from "../../context/games/GamesContext";
import UserContext from "../../context/user/UserContext";
import PropTypes from "prop-types";
import GameListItem from "./GameListItem";
import Loading from "../layout/Loading";
import GameListMiddleLayer from "./GameListMiddleLayer";
import ProfileComponent from "./ProfileComponent";

function GameListForProfile() {
  const { reading, gamesWantToPlay, gamesPlayed, getGamer} = useContext(UserContext); 
  //useEffect
  useEffect(() => {    
    getGamer(); 
        
  }, []);

  
  if (reading) {
    return <Loading />
  } else {
    return (   
      <>
       <div className="card  bg-base-300 p-4 my-8">
          <ProfileComponent />
        <div>
         
        </div>
      </div>
   
        <div className="card  bg-base-300 p-4 my-8">
          <h1 className="card-title">Games Want To Play</h1>      
          <GameListMiddleLayer className="card-body" gamesWantToPlayIdList={gamesWantToPlay} gamesPlayedIdList={gamesPlayed} title="Games Want To Play" />
        </div>
        <div className="card  bg-base-300 p-4 my-8">
          <h1 className="card-title">Games Played</h1>      
          <GameListMiddleLayer className="card-body" gamesWantToPlayIdList={gamesWantToPlay} gamesPlayedIdList={gamesPlayed} title="Games Played" />
        </div>         
      
      </>
    );
  }  
 
 
}

GameListForProfile.propTypes = {
  title: PropTypes.string,
};


export default GameListForProfile;
