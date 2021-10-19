import React from 'react'
import { Button } from '@mui/material'

interface Props {
  toggleCallback?: (value?: any) => void
  children: any
}

const RigidButton = (props: Props) => {
  const { toggleCallback } = props
  return (
    <Button
      disableElevation
      variant='contained'
      color='secondary'
      className='rigid-button'
      size='small'
      onClick={() => toggleCallback}
      sx={{ height: '48px', minWidth: '20px !important', width: '48px' }}
    >
      {props.children}
    </Button>
  )
}

export default RigidButton
