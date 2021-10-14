import React, { useEffect } from 'react'
import { client } from '../../config/axiosConfig'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const Scoreboard = () => {
  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
  ) {
    return { name, calories, fat, carbs, protein }
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ]

  const getScoreboard = () => {
    client
      .get('/scoreboard')
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getScoreboard()
  }, [])

  return (
    <div className='scoreboard-container scoreboard-home'>
      <h2 className='section-title'>Scoreboard 🏆</h2>
      <Paper
        elevation={0}
        sx={{ backgroundColor: 'transparent', maxWidth: '100%' }}
      >
        <Table
          sx={{ maxWidth: '100%' }}
          size='small'
          aria-label='a dense table'
        >
          <TableHead>
            <TableRow className='table-row'>
              {/* <TableCell >Dessert (100g serving)</TableCell> */}
              <TableCell align='left' sx={{ borderBottom: 'transparent' }}>
                Rank
              </TableCell>
              <TableCell align='left' sx={{ borderBottom: 'transparent' }}>
                Player
              </TableCell>
              <TableCell align='center' sx={{ borderBottom: 'transparent' }}>
                W
              </TableCell>
              <TableCell align='center' sx={{ borderBottom: 'transparent' }}>
                L
              </TableCell>
              <TableCell align='score' sx={{ borderBottom: 'transparent' }}>
                Score
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ border: 'none' }}
                // className="table-row-divider"
              >
                {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
                <TableCell align='left' sx={{ borderBottom: 'none' }}>
                  {row.calories}
                </TableCell>
                <TableCell align='left' sx={{ borderBottom: 'none' }}>
                  {row.fat}
                </TableCell>
                <TableCell align='center' sx={{ borderBottom: 'none' }}>
                  {row.carbs}
                </TableCell>
                <TableCell align='center' sx={{ borderBottom: 'none' }}>
                  {row.protein}
                </TableCell>
                <TableCell align='center' sx={{ borderBottom: 'none' }}>
                  {row.protein}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
}

export default Scoreboard
