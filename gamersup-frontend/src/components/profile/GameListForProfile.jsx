import GameListMiddleLayer from "./GameListMiddleLayer";


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

export default GameListForProfile;
