import React, { useState, useRef, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(username, passedQuestions, failedQuestions, gamesPlayed, timePlayed, points) {
  return { username, passedQuestions, failedQuestions, gamesPlayed, timePlayed, points };
}

const rows = [
  createData('Murias10', 0, 0, 0, 0, 0),
  createData('Didier', 0, 0, 0, 0, 0)
];

const fetchLeaderboard = async () => {
  const response = await fetch('http://localhost:8000/history/leaderboard');
  const data = await response.json();
  console.log(data);
};


const Leaderboard = () => {

  var [leaderboard, setLeaderboard] = useState([])
  var [error, setError] = useState(null)

  useEffect(() => {
    ; (async () => {
      try {
        setLeaderboard(await fetchLeaderboard())
      } catch (error) {
        setError(error.message) // Set error state if fetch fails
      }
    })()
  }, [])

  return (
    <div>
      <h1>Leaderboard</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell align="center">Passed questions</StyledTableCell>
              <StyledTableCell align="center">Failed questions</StyledTableCell>
              <StyledTableCell align="center">Games played</StyledTableCell>
              <StyledTableCell align="center">Time played</StyledTableCell>
              <StyledTableCell align="center">Points</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">{row.username}</StyledTableCell>
                <StyledTableCell align="center" >{row.passedQuestions}</StyledTableCell>
                <StyledTableCell align="center">{row.failedQuestions}</StyledTableCell>
                <StyledTableCell align="center">{row.gamesPlayed}</StyledTableCell>
                <StyledTableCell align="center">{row.timePlayed}</StyledTableCell>
                <StyledTableCell align="center">{row.points}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Leaderboard;
