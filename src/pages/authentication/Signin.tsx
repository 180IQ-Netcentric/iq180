import React from 'react'
import GameContainer from '@/components/containers/GameContainer'
import RoundedTextField from '@/components/common/RoundedTextField'

const SignIn = () => {
  return (
    <GameContainer>
      <h1>Sign In</h1>
      <div className='authentication-container'>
        <div className='form-container'>
          <RoundedTextField></RoundedTextField>
        </div>
        <div className='form-img'></div>
      </div>
    </GameContainer>
  )
}

export default SignIn
