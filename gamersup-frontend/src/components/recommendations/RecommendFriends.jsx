import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import UserContext from '../../context/user/UserContext'
import Loading from '../layout/Loading'
import FriendItemR from './FriendItemR'

function RecommendFriends() {
  const { getRecommendFriends } = useContext(UserContext)

  const [raters, setRaters] = useState([])
  const [loading, setLoading] = useState(true)

  const params = useParams()

  useEffect(() => {
    getRecommendFriends(params.id)
      .then((result) => {
        setRaters(result.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  if (loading) {
    <Loading />
  } else {
    return (
      <>
      <h3 className='text-xl font-semibold my-5 text-neutral-content ml-10'>Discover People</h3>
        <div className='flex flex-wrap justify-between mx-10'>
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
}

export default RecommendFriends
