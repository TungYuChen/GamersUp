import { React, useContext } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import GamesContext from '../../context/games/GamesContext'
import { Link } from 'react-router-dom'

function GamePlatforms() {
  const { setPlatform } = useContext(GamesContext)

  return (
    <div className='flex place-content-center'>
      <div className='dropdown dropdown-right'>
        <label
          tabIndex='0'
          className='btn btn-ghost btn-lg text-3xl font-bold my-5'
        >
          Discover Games
          <ChevronDownIcon className='inline w-12 mt-1 ml-2 text-primary group-hover:text-primary-focus' />
        </label>
        <ul
          tabIndex='0'
          className='mt-5 p-2 shadow menu menu-compact dropdown-content bg-primary-focus rounded-box w-60'
        >
          <li>
            <Link to={'/platform/all'}
              className='btn btn-ghost text-lg font-semibold hover:text-neutral-focus'
              id='-1'
              onClick={() => setPlatform('0')}
            >
              All Platforms
            </Link>
          </li>
          <li>
            <Link to={'/platform/pc'}
              className='text-lg font-semibold hover:text-neutral-focus'
              id='4'
              onClick={() => setPlatform('4')}
            >
              PC
            </Link>
          </li>
          <li>
            <Link to={'/platform/ps5'}
              className='text-lg font-semibold hover:text-neutral-focus'
              id='187'
              onClick={() => setPlatform('187')}
            >
              PlayStation 5
            </Link>
          </li>
          <li>
            <Link to={'/platform/ps4'}
              className='text-lg font-semibold hover:text-neutral-focus'
              id='18'
              onClick={() => setPlatform('18')}
            >
              PlayStation 4
            </Link>
          </li>
          <li>
            <Link to={'/platform/switch'}
              className='text-lg font-semibold hover:text-neutral-focus'
              id='7'
              onClick={() => setPlatform('7')}
            >
              Nintendo Switch
            </Link>
          </li>
          <li>
            <Link to={'/platform/xboxxs'}
              className='text-lg font-semibold hover:text-neutral-focus'
              id='186'
              onClick={() => setPlatform('186')}
            >
              Xbox Series X/S
            </Link>
          </li>
          <li>
            <Link to={'/platform/xboxone'}
              className='text-lg font-semibold hover:text-neutral-focus'
              id='1'
              onClick={() => setPlatform('1')}
            >
              Xbox One
            </Link>
          </li>
          <li>
            <Link to={'/platform/wiiu'}
              className='text-lg font-semibold hover:text-neutral-focus'
              id='10'
              onClick={() => setPlatform('10')}
            >
              Wii U
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default GamePlatforms
