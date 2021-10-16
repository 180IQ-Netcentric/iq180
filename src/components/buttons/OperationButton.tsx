import React, { useContext } from 'react'
import { ButtonProps, ToggleButton } from '@mui/material'
import { Button } from '@mui/material'

interface Props {
    // border: string;
    // color: string;
    // toggleCallback: (value?: any) => void
    children: any
  }

const OperationButton = (props:Props) =>{
    return (
        <Button>
            {props.children}
        </Button>
        
        
    )
}

export  default OperationButton