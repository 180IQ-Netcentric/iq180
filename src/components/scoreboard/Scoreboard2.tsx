import React, { useEffect, useState } from 'react'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import { visuallyHidden } from '@mui/utils'
import { client } from '../../config/axiosConfig'
interface Data {
  rank: number
  player: string
  win: number
  lose: number
  score: number
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'rank',
    numeric: true,
    disablePadding: true,
    label: 'Rank',
  },
  {
    id: 'player',
    numeric: false,
    disablePadding: false,
    label: 'Player',
  },
  {
    id: 'win',
    numeric: true,
    disablePadding: false,
    label: 'W',
  },
  {
    id: 'lose',
    numeric: true,
    disablePadding: false,
    label: 'Lose',
  },
  {
    id: 'score',
    numeric: true,
    disablePadding: false,
    label: 'Score',
  },
]

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={
              headCell.id === 'player' || headCell.id === 'rank'
                ? 'left'
                : 'center'
            }
            // padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default function Scoreboard2() {
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('score')
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [page, setPage] = React.useState(0)
  const [dense] = React.useState(true)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  function createData(
    player: string,
    rank: number,
    win: number,
    lose: number,
    score: number
  ): Data {
    return {
      rank,
      player,
      win,
      lose,
      score,
    }
  }

  const [rows, setRows] = useState<Data[]>([
    // createData('Cupcake', 305, 3.7, 67, 4.3),
    // createData('Donut', 452, 25.0, 51, 4.9),
    // createData('Eclair', 262, 16.0, 24, 6.0),
    // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    // createData('Gingerbread', 356, 16.0, 49, 3.9),
    // createData('Honeycomb', 408, 3.2, 87, 6.5),
    // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    // createData('Jelly Bean', 375, 0.0, 94, 0.0),
    // createData('KitKat', 518, 26.0, 65, 7.0),
    // createData('Lollipop', 392, 0.2, 98, 0.0),
    // createData('Marshmallow', 318, 0, 81, 2.0),
    // createData('Nougat', 360, 19.0, 9, 37.0),
    // createData('Oreo', 437, 18.0, 63, 4.0),
  ])

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.player)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const getScoreboard = () => {
    client
      .get('/scoreboard')
      .then((res) => {
        const scores: Data[] = res.data
        const formattedScore = scores.map((info) => {
          return createData(
            info.player,
            info.rank,
            info.win,
            info.lose,
            info.score
          )
        })
        setRows(formattedScore)
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
      <Box>
        <Paper elevation={0} sx={{ backgroundColor: 'transparent' }}>
          <TableContainer sx={{ backgroundColor: 'transparent' }}>
            <Table
              // sx={{ minWidth: 750 }}
              sx={{ backgroundColor: 'transparent', maxWidth: '100%' }}
              aria-labelledby='tableTitle'
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.player)
                    const labelId = `enhanced-table-checkbox-${index}`

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.player)}
                        role='checkbox'
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.player}
                        selected={isItemSelected}
                      >
                        <TableCell
                          component='th'
                          id={labelId}
                          scope='row'
                          align='left'
                        >
                          {row.rank}
                        </TableCell>
                        <TableCell align='left' sx={{ maxWidth: '40px' }}>
                          {row.player}
                        </TableCell>
                        <TableCell align='center'>{row.win}</TableCell>
                        <TableCell align='center'>{row.lose}</TableCell>
                        <TableCell align='center'>{row.score}</TableCell>
                      </TableRow>
                    )
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  )
}
