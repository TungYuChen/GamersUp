import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserContext from '../../context/user/UserContext'
import GameItemR from './GameItemR'

function RecommendGames() {
  const { getRecommendGames } = useContext(UserContext)

  const [games, setGames] = useState([])

  const params = useParams()

  useEffect(() => {
    getRecommendGames(params.id)
      .then((result) => {
        setGames(result.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <h3 className='text-xl font-semibold my-5 text-neutral-content ml-10'>
        Discover Games
      </h3>
      <div className='grid gap-5 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 my-5 mx-10'>
        {games?.map((game) => (
          <GameItemR key={game.item} userID={params.id} gameID={game.item} />
        ))}
      </div>
    </>
  )
}

export default RecommendGames
