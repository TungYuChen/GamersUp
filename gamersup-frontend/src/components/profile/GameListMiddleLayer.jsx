import { useContext, useEffect, useState } from 'react'
import GamesContext from '../../context/games/GamesContext'
import UserContext from "../../context/user/UserContext";
import PropTypes from 'prop-types';
import GameListItem from './GameListItem';
import Loading from '../layout/Loading';

function GameListMiddleLayer({title}) {
  const {fetching, wantToPlayObject, playedObject} = useContext(UserContext);
  

if (fetching) {
    return <Loading />
} else {
    if (title === "Games Want To Play") {
        return (
            <>                             
                <div className='grid gap-5 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mt-2 mb-2'>  
                {wantToPlayObject?.map((game) => (
                    <GameListItem key={game.id} game={game} />
              ))}
                </div>        
            </>
        )
    } else if (title === "Games Played") {
        return (
            <>                             
                <div className='grid gap-5 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mt-2 mb-2'>  
                {playedObject?.map((game) => (
                    <GameListItem key={game.id} game={game} />
              ))}
                </div>        
            </>
        )
    }
   
 
}
    
   
}
GameListMiddleLayer.propTypes = {
    title: PropTypes.string
}

export default GameListMiddleLayer
