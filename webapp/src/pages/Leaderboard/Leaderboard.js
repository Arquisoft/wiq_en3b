import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { API_ENDPOINT } from "../../utils/constants";
import { formatTime } from "../../utils/formatTime";

import { ReactComponent as BronzeMedalIcon } from "../../assets/medal-bronze.svg";
import { ReactComponent as SilverMedalIcon } from "../../assets/medal-silver.svg";
import { ReactComponent as GoldMedalIcon } from "../../assets/medal-gold.svg";

import { useTranslation } from "react-i18next";

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

const Leaderboard = () => {

  //Translation
  const { t } = useTranslation();

  var [leaderboard, setLeaderboard] = useState([])
  var [, setError] = useState(null)

  useEffect(() => {
    ; (async () => {
      try {
        setLeaderboard(await fetchLeaderboard()) // Fetch leaderboard data and set state
      } catch (error) {
        setError(error.message) // Set error state if fetch fails
      }
    })()
  }, [])



  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(API_ENDPOINT + '/history/leaderboard');
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
      <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>{t("leaderboard.title")}</h1>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <TableContainer component={Paper} style={{ width: '75%' }}>
          <Table sx={{ minWidth: 600 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Ranking</StyledTableCell>
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
                <StyledTableRow key={row.username}>
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
                  <StyledTableCell align="center">{formatTime(row.timePlayed)}</StyledTableCell>
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
