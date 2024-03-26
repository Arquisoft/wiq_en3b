import React, { useState, useRef, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { ReactComponent as BronzeMedalIcon } from "../../assets/medal-bronze.svg";
import { ReactComponent as SilverMedalIcon } from "../../assets/medal-silver.svg";
import { ReactComponent as GoldMedalIcon } from "../../assets/medal-gold.svg";


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

function createData(ranking, username, passedQuestions, failedQuestions, gamesPlayed, timePlayed, points) {
  return { ranking, username, passedQuestions, failedQuestions, gamesPlayed, timePlayed, points };
}

var rows = [
  createData(1, 'Murias10', 0, 0, 0, 0, 0),
  createData(2, 'User01', 0, 0, 0, 0, 0),
  createData(3, 'User02', 0, 0, 0, 0, 0),
  createData(4, 'User03', 0, 0, 0, 0, 0),
  //createData(5, 'User04', 0, 0, 0, 0, 0),
  //createData(6, 'User05', 0, 0, 0, 0, 0),
  //createData(7, 'User06', 0, 0, 0, 0, 0),
  //createData(8, 'User07', 0, 0, 0, 0, 0),
  //createData(9, 'User08', 0, 0, 0, 0, 0),
  //createData(10, 'User0', 0, 0, 0, 0, 0)
];


const Leaderboard = () => {

  var [leaderboard, setLeaderboard] = useState([])
  var [error, setError] = useState(null)

  useEffect(() => {
    ; (async () => {
      try {
        //setLeaderboard(await fetchLeaderboard())
        setLeaderboard(rows)
      } catch (error) {
        setError(error.message) // Set error state if fetch fails
      }
    })()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('http://localhost:8000/history/leaderboard');
      const data = await response.json();

      const leaderboard = data.data.leaderboard.map((element, index) => {
        const { username, history } = element;
        const { passedQuestions, failedQuestions, gamesPlayed, timePlayed, points } = history;
        return createData(index + 1, username, passedQuestions, failedQuestions, gamesPlayed, timePlayed, points);
      });

      console.log(leaderboard);

      return leaderboard;
    } catch (error) {
      throw new Error('Failed to fetch leaderboard data');
    }
  };


  return (
    <div>
      <h1>Leaderboard</h1>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <TableContainer component={Paper} style={{ width: '75%' }}>
          <Table sx={{ minWidth: 600 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Rank</StyledTableCell>
                <StyledTableCell align="center">Username</StyledTableCell>
                <StyledTableCell align="center">Passed questions</StyledTableCell>
                <StyledTableCell align="center">Failed questions</StyledTableCell>
                <StyledTableCell align="center">Games played</StyledTableCell>
                <StyledTableCell align="center">Time played</StyledTableCell>
                <StyledTableCell align="center">Points</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboard.map((row, index) => (
                <StyledTableRow key={row.ranking}>

                  <StyledTableCell align="center">
                    {index === 0 && <GoldMedalIcon style={{ width: '40px', height: '25px', padding: '0px' }} />}
                    {index === 1 && <SilverMedalIcon style={{ width: '40px', height: '25px', padding: '0px' }} />}
                    {index === 2 && <BronzeMedalIcon style={{ width: '40px', height: '25px', padding: '0px' }} />}
                    {index >= 3 && row.ranking}
                  </StyledTableCell>

                  <StyledTableCell align="center">{row.username}</StyledTableCell>
                  <StyledTableCell align="center">{row.passedQuestions}</StyledTableCell>
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
    </div >
  );
};

export default Leaderboard;
