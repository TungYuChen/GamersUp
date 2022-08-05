import React from 'react'
import RecommendFriends from '../components/recommendations/RecommendFriends'
import RecommendGames from '../components/recommendations/RecommendGames'

function RecommendationPage() {
  return (
    <>
      <h2 className='text-3xl font-bold my-5 text-center text-info'>RECOMMENDATIONS FOR YOU</h2>
      <RecommendFriends />
      <RecommendGames />
    </>
  )
}

export default RecommendationPage
