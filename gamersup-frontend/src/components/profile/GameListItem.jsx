import { React, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GamesContext from '../../context/games/GamesContext'
import gameimage from '../../images/gameimage.jpg'
import { PlusIcon, CheckIcon } from '@heroicons/react/solid'
import Loading from '../layout/Loading'

function GameListItem({ id }) {  
  const { getGameByID } = useContext(GamesContext);
  const [ validImage, setValidImage ] = useState(true)
  
  const [game, setGame] = useState();
  

  
  useEffect(() => {     
    getGameByID(id).then( response => {
      setGame(response.data);      
    })
    if (game?.background_image == null) {
      setValidImage(false)
    }         
   
  }, [])


    return (
      <div className='card w-72 bg-base-200 shadow-xl flex-none mr-5'>
        {validImage && (
          <figure>
            <img
              className='custom-card-image'
              src={gameimage}
              alt={'game_image'}
            />
          </figure>
        )}
  
        {!validImage && (
          <figure>
            <img
              className='custom-card-image'
              src={game?.background_image}
              alt={'default_game_image'}
            />
          </figure>
        )}
  
        <div className='card-body'>
          <div className='card-title text-base mb-3'>
            <div className='inline badge badge-accent font-bold'>{game?.rating}</div>
            {game?.name}
          </div>
          {/* <div className='card-actions justify-start'>
            <button className='btn-ghost badge badge-outline text-xs hover:bg-primary-focus'>
              <PlusIcon className='inline mr-1 w-5' />
              Want to Play
            </button>
            <button className='btn-ghost badge badge-outline text-xs'>
              <CheckIcon className='inline mr-1 w-5' />
              Played
            </button>
          </div> */}
        </div>
      </div>
    )
  }

  



export default GameListItem
