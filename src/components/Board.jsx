import { useState} from 'react'

const Board = () => {
  return (
    <section
    className='w-full h-full md:px-20 md:py-15 p-4'
    >
        <h1
        className='text-3xl text-blue-700 text-center'
        >Tic Tac Toe</h1>
    <div className='w-full min-h-full bg-black p-4 flex'>
    </div>
    </section>
  )
}

export default Board