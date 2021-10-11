import { useStyles } from '@/styles/useStyles'
import { ToggleButton } from '@mui/material'
import React from 'react'

interface Props {
  item: any
  matcher: any
  toggleCallback: (value?: any) => void
  children: any
}

const GameToggleButton = (props: Props) => {
  const classes = useStyles()

  return (
    <ToggleButton
      className={`toggle-buttons-gap ${classes.toggleButton}`}
      key={props.item}
      value='check'
      selected={props.matcher === props.item}
      onChange={() => {
        props.toggleCallback(props.item)
      }}
      color='secondary'
      sx={{
        height: '64px',
        width: '64px',
        paddingLeft: '12px',
        backgroundColor: '#F3C18E',
        borderRadius: '8px',
        border: 'none',
      }}
    >
      {props.children}
    </ToggleButton>
  )
}

export default GameToggleButton
