import React from 'react'
import { Button, Box, Modal, Fade, Typography, Backdrop } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  maxWidth: 400,
  bgcolor: 'background.paper',
  boxShadow: 16,
  p: 4,
  borderRadius: '12px'
}

interface Props {
  open: boolean
  handleOpen: (value: boolean) => void,
  handleClose: (value: boolean) => void,
}
const BaseModal = (props: Props) => {
  const {open, handleOpen, handleClose} = props

  
  return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {/* @ts-ignore */}
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <Button onClick={() => {
              console.log(window.localStorage.getItem('isDarkTheme') === 'false' )
              window.localStorage.setItem('isDarkTheme', (window.localStorage.getItem('isDarkTheme') === 'false' ).toString())
            }}>toggle theme</Button>
          </Box>
        </Fade>
      </Modal>
  )
}

export default BaseModal