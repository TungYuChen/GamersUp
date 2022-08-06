import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import UserContext from '../../context/user/UserContext'
import FriendItemR from './FriendItemR'
import NoRecommendations from './NoRecommendations'

function RecommendFriends() {
  const { getRecommendFriends } = useContext(UserContext)

  const [raters, setRaters] = useState([])

  const params = useParams()

  useEffect(() => {
    getRecommendFriends(params.id)
      .then((result) => {
        setRaters(result.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <h3 className='text-xl font-semibold my-5 text-neutral-content ml-10'>
        Discover People
      </h3>
      {raters.length < 1 && <NoRecommendations />}
      <div className='grid gap-5 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 my-5 mx-10'>
        {raters?.map((rater) => (
          <FriendItemR
            key={rater.item}
            userID={params.id}
            gamerID={rater.item}
          />
        ))}
      </div>
    </>
  )
}

export default RecommendFriends
