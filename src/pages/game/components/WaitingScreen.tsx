import React from 'react'
import Tips from '../../../components/tips/Tips'

const WaitingScreen = () => {
  return (
    <div className='waiting-screen-container'>
      <h4>Please wait while your opponent is making a move...</h4>
      <Tips />
    </div>
  )
}

export default WaitingScreen
