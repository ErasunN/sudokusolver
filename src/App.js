import React, { Component } from 'react'
import ZudokuTable from './components/table/ZudokuTable'
import Button from '@mui/material/Button';
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        ['', '9', '', '', '4', '2', '1', '3', '6'],
        ['', '', '', '9', '6', '', '4', '8', '5'],
        ['', '', '', '5', '8', '1', '', '', ''],
        ['', '', '4', '', '', '', '', '', ''],
        ['5', '1', '7', '2', '', '', '9', '', ''],
        ['6', '', '2', '', '', '', '3', '7', ''],
        ['1', '', '', '8', '', '4', '', '2', ''],
        ['7', '', '6', '', '', '', '8', '1', ''],
        ['3', '', '', '', '9', '', '', '', '']
      ]
    }
  }

  isValid = (board, row, col, k) => {
    for (let i = 0; i < 9; i++) {
      const m = 3 * Math.floor(row / 3) + Math.floor(i / 3)
      const n = 3 * Math.floor(col / 3) + i % 3
      if (board[row][i] === k || board[i][col] === k || board[m][n] === k) {
        return false
      }
    }
    return true
  }
  
  
  /**
  *Note that the use of ` and a variable inside is to make that variable a strimg as provided by input array of arrays
  */
  sudokuSolver = (data) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (data[i][j] === '') {
          for (let k = 1; k <= 9; k++) {
            if (this.isValid(data, i, j, `${k}`)) {
              data[i][j] = `${k}`
              if (this.sudokuSolver(data)) {
                return true
              } else {
                data[i][j] = ''
              }
            }
          }
          return false
        } 
      }
    }
    this.setState({
      board: data
    })
    return true
  }

  changeNumber = (position, newNumber) => {
    let { board } = this.state
    board[position.row][position.col] = newNumber;
    this.setState({
      board
    })
  }

  solveSudoku = () => {
    let sudokuSolved = this.sudokuSolver(this.state.board);
    if(sudokuSolved){
      alert('Congrats, your sudoku is solved');
    }else{
      alert('Oh ho, your sudoku has a problem that makes me unable to sove it');
    }
  }

  refreshBoard = () => {
    let { board } = this.state;
    for (let row = 0; row < board.length; row++) {
      for (let cell = 0; cell < board[row].length; cell++) {
        board[row][cell] = '';
      }
    }
    this.setState({
      board
    })
  }

  render() {
    return (
      <div className='width-90 center'>
        <h1>
          Sudoku Solver
        </h1>
        <div className='width-75 center'>
          <ZudokuTable rows={this.state.board} changeNumber={this.changeNumber}/>
          <div className='margin-y-5 flex-between'>
            <Button variant="contained" size="small" onClick={() => this.refreshBoard()}>
              Reset
            </Button>
            <Button variant="contained" size="small" onClick={() => this.solveSudoku()}>
              Solve
            </Button>
          </div>
        </div>
      </div>
    )
  }
}