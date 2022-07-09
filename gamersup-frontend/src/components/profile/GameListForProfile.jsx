import { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import GameListMiddleLayer from "./GameListMiddleLayer";
import UserContext from "../../context/user/UserContext";

function GameListForProfile() { 
  
    return (   
      <>    
        <div className="card  bg-base-300 p-4 my-8">
          <h1 className="card-title">Games Want To Play</h1>      
          <GameListMiddleLayer className="card-body" title="Games Want To Play" />
        </div>
        <div className="card  bg-base-300 p-4 my-8">
          <h1 className="card-title">Games Played</h1>      
          <GameListMiddleLayer className="card-body" title="Games Played" />
        </div>      
      </>
    );
    
 
 
}

GameListForProfile.propTypes = {
  title: PropTypes.string,
};


export default GameListForProfile;
