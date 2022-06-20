import { React, useContext } from 'react'
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from '@heroicons/react/solid'
import GamesContext from '../../context/games/GamesContext'

function PageBar() {
  const { index, setNextPage, setPrevPage, getGames } = useContext(GamesContext)

  const handleNext = (e) => {
    e.preventDefault()
    setNextPage()
    getGames()
  }

  const handlePrev = (e) => {
    e.preventDefault()
    setPrevPage()
    getGames()
  }

  return (
    <div className='flex place-content-center align-middle mb-5'>
      <button className='btn btn-ghost btn-circle mr-3' onClick={handlePrev}>
        <ArrowCircleLeftIcon className='w-8 text-primary group-hover:text-primary-focus' />
      </button>
      <span className='inline mt-3 font-medium'>Page {index+1}</span>
      <button className='btn btn-ghost btn-circle ml-3' onClick={handleNext}>
        <ArrowCircleRightIcon className='w-8 text-primary group-hover:text-primary-focus' />
      </button>
    </div>
  )
}

export default PageBar
