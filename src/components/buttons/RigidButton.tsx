import React from 'react'
import { Button } from '@mui/material'

interface Props {
  onClick?: (value?: any) => void
  children: any
}

const RigidButton = (props: Props) => {
  const { onClick } = props
  return (
    <Button
      disableElevation
      variant='contained'
      color='secondary'
      className='rigid-button'
      size='small'
      onClick={onClick}
      sx={{ height: '48px', minWidth: '20px !important', width: '48px' }}
    >
      {props.children}
    </Button>
  )
}

export default RigidButton
