import React from 'react'
import { Button } from '@mui/material'
import BaseModal from '@/components/modals/BaseModal'
import GameContainer from '@/components/containers/GameContainer'

const Home = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const changeBackground = () => {
    document.body.classList.add('page-backgroud-1')
  }
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Button onClick={changeBackground}>Change Background</Button>
      <BaseModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      <GameContainer>Game Content</GameContainer>
    </div>
  )
}

export default Home
