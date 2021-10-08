import React from 'react'
import { Button } from '@mui/material'
import BaseModal from '@/components/modals/BaseModal'

const Home = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <BaseModal open={open} handleOpen={handleOpen} handleClose={handleClose} />
    </div>
  )
}

export default Home
