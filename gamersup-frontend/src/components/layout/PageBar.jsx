import { React, useContext } from 'react'
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from '@heroicons/react/solid'
import GamesContext from '../../context/games/GamesContext'

function PageBar() {
  const { page, setNextPage, setPrevPage } = useContext(GamesContext)

  return (
    <div className='flex place-content-center align-middle mb-5'>
      {page === 1 && (
        <button
          className='btn btn-ghost btn-circle mr-3'
          onClick={setPrevPage}
          disabled
        >
          <ArrowCircleLeftIcon className='w-8 text-gray-400' />
        </button>
      )}
      {page !== 1 && (
        <button className='btn btn-ghost btn-circle mr-3' onClick={setPrevPage}>
          <ArrowCircleLeftIcon className='w-8 text-primary group-hover:text-primary-focus' />
        </button>
      )}

      <span className='inline mt-3 font-medium'>Page {page}</span>
      <button className='btn btn-ghost btn-circle ml-3' onClick={setNextPage}>
        <ArrowCircleRightIcon className='w-8 text-primary group-hover:text-primary-focus' />
      </button>
    </div>
  )
}

export default PageBar
