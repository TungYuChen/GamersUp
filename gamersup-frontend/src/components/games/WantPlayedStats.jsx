import { React, useEffect, useContext, useState } from 'react'
import { PlusIcon, CheckIcon } from '@heroicons/react/solid'
import GamesContext from '../../context/games/GamesContext'
import UserContext from '../../context/user/UserContext'
import AlertContext from '../../context/alert/AlertContext'

function WantPlayedStats({ gameID, user: { userID } }) {
//   const API_URL = process.env.REACT_APP_BACKEND_API_URL

  const { getWantToPlayGamersByGameId, getPlayedGamersByGameId } =
    useContext(GamesContext)

  const {
    isLoggedIn,
    clickWantToPlay,
    clickPlayed,
    checkWantToPlay,
    checkPlayed,
  } = useContext(UserContext)

  const { setAlertWithTimeout } = useContext(AlertContext)

  const [wantToPlayGamers, setWantToPlayGamers] = useState([])
  const [playedGamers, setPlayedGamers] = useState([])
  const [wantToPlay, setWantToPlay] = useState(false)
  const [played, setPlayed] = useState(false)
  const [click, setClick] = useState(0)

  //   const checkWantToPlay = async (id) => {
  //     const { data } = await axios.post(`${API_URL}/games/check/wanttoplay`, {
  //       gameID: id,
  //       gamerID: userID,
  //     })
  //     setWantToPlay(data)
  //   }

  //   const checkPlayed = async (id) => {
  //     const { data } = await axios.post(`${API_URL}/games/check/played`, {
  //       gameID: id,
  //       gamerID: userID,
  //     })
  //     setPlayed(data)
  //   }

  useEffect(() => {
    console.log(gameID)
    if (gameID !== null) {
      getWantToPlayGamersByGameId(gameID).then((response) => {
        setWantToPlayGamers(response.data)
      })
      getPlayedGamersByGameId(gameID).then((response) => {
        setPlayedGamers(response.data)
      })
    }
    if (isLoggedIn()) {
      checkWantToPlay(gameID).then((response) => {
        setWantToPlay(response.data)
      })
      checkPlayed(gameID).then((response) => {
        setPlayed(response.data)
      })
    } else {
      setWantToPlay(false)
      setPlayed(false)
    }
    setClick(0)
  }, [click, isLoggedIn()])

  const handleClickWant = async (e) => {
    e.preventDefault()
    if (isLoggedIn()) {
      await clickWantToPlay(gameID, userID)
      setClick(1)
    } else {
      setAlertWithTimeout('Please sign in.', 'information')
    }
  }

  const handleClickPlayed = async (e) => {
    e.preventDefault()
    if (isLoggedIn()) {
      await clickPlayed(gameID, userID)
      setClick(1)
    } else {
      setAlertWithTimeout('Please sign in.', 'information')
    }
  }

  return (
    <div className='w-full rounded-lg shadow-md bg-base-100 stats'>
      <div className='stat'>
        <div
          className='stat-title text-md btn-ghost hover:bg-primary-focus'
          onClick={handleClickWant}
        >
          <PlusIcon className='inline mr-1 w-5' />
          {wantToPlay && <strong>Cancel Want-to-Play</strong>}
          {!wantToPlay && <strong>Want to Play</strong>}
        </div>
        <div className='text-lg stat-value'>{wantToPlayGamers?.length}</div>
      </div>

      <div className='stat'>
        <div
          className='stat-title text-md btn-ghost hover:bg-primary-focus'
          onClick={handleClickPlayed}
        >
          <CheckIcon className='inline mr-1 w-5' />
          {played && <strong>Cancel Played</strong>}
          {!played && <strong>Played</strong>}
        </div>
        <div className='text-lg stat-value'>{playedGamers?.length}</div>
      </div>
    </div>
  )
}

export default WantPlayedStats
