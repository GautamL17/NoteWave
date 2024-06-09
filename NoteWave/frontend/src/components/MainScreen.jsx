import React from 'react'

const MainScreen = ({title, children}) => {
  return (
    <div>
      <div className='mx-auto w-[70%] mt-5 text-white '>
        {
            <>
            {{title} && <h1 className='text-5xl font-bold mb-10' >{title}</h1>}
            </>
        }
        {children}
      </div>
    </div>
  )
}

export default MainScreen
