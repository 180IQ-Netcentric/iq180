import React, { useContext } from 'react'
import { Button } from '@mui/material'

interface Props {
  toggleCallback?: (value?: any) => void
  children: any
}

const OperationButton = (props: Props) => {
  const { toggleCallback } = props
  return (
    <Button
      disableElevation
      variant='contained'
      color='primary'
      className='operation-button'
      onClick={() => toggleCallback}
      sx={{ minWidth: '60px', width: '60px' }}
    >
      {props.children}
    </Button>
  )
}

export default OperationButton
