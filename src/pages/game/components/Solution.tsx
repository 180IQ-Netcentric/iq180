



import { AlignHorizontalCenter, Margin } from '@mui/icons-material'
import React from 'react'
import { isArgumentsObject } from 'util/types'

export default function Solution() {
  return (
    <div className='show-solution'>
        <div>
          <div style={{ fontSize: '24px'}}>Solution</div>
          <div style={{ fontSize: '36px',fontWeight: 'bold' }}>
            <span>1 + 2 + 3 + 4 + 5</span>
          </div>
          <div >Please wait for the host to start...</div>
        </div>
      </div>
  )
}

