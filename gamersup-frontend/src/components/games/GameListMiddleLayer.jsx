import { useContext, useEffect } from 'react'
import GamesContext from '../../context/games/GamesContext'
import UserContext from '../../context/user/UserContext';
import PropTypes from 'prop-types';
import GameListItem from './GameListItem';
import Loading from '../layout/Loading';

function GameListMiddleLayer({ id }) {
  const { loading, gameData, getGameById } = useContext(GamesContext);
  const { gamesWantToPlay, gamesPlayed, getGamer} = useContext(UserContext); 
  
  //useEffect
    useEffect(() => {
                  
        getGameById(id); 
    }, [])
    

  

if (loading) {
    return <Loading />
} else {
    return (
        <> 
            <h1>{gameData.name}</h1>                 
                <div className='grid gap-5 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mt-5 mb-5'>
                    { <GameListItem key={gameData.id} game={gameData} />
                    }
            </div>        
        </>
    )
 
}
    
   
}
GameListMiddleLayer.propTypes = {
    title: PropTypes.string
}

export default GameListMiddleLayer
