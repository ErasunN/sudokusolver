import React from 'react'
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import '../assets/styles.css'

const ZudokuCell = ({ number, position, changeNumber }) => {
  return (
    <TableCell align="center">
        <TextField id="outlined-basic" label={number} variant="outlined" onChange={(e) => changeNumber(position, e.target.value)}/>
    </TableCell>
  )
}

export default ZudokuCell