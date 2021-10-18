import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

type Props = {
  open: boolean
  setOpen: (value: boolean) => void
}

const GenericErrorAlert = (props: Props) => {
  const { open, setOpen } = props
  const handleClose = () => {
    setOpen(false)
  }

  if (!open) return null
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Something went wrong.</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Please try again.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default GenericErrorAlert
