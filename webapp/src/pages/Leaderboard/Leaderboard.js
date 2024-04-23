import React, { useState, useEffect, useCallback, useRef } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Leaderboard.css'
import Button from '../../components/Button/Button'

import { API_ENDPOINT } from "../../utils/constants";
import { formatTime } from "../../utils/formatTime";

import { ReactComponent as BronzeMedalIcon } from "../../assets/medal-bronze.svg";
import { ReactComponent as SilverMedalIcon } from "../../assets/medal-silver.svg";
import { ReactComponent as GoldMedalIcon } from "../../assets/medal-gold.svg";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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
  const lastFetchedCount = useRef(10);
  const scrollPosition = useRef(0); // Add this line

  var [leaderboard, setLeaderboard] = useState([])
  var [, setError] = useState(null)
  var [nUsers, setNUsers] = useState(10);
  var [disableButton, setDisableButton] = useState(false);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const response = await fetch(API_ENDPOINT + '/history/leaderboard?size=' + nUsers);
      const data = await response.json();

      const leaderboard = data.data.leaderboard.map((element, index) => {
        const { username, history } = element;
        const { passedQuestions, failedQuestions, gamesPlayed, timePlayed, points } = history;
        return createData(index + 1, username, passedQuestions, failedQuestions, gamesPlayed, timePlayed, points);
      });

      setDisableButton(data.data.leaderboard.length % 10 !== 0 || data.data.leaderboard.length === lastFetchedCount);
      lastFetchedCount.current = data.data.leaderboard.length;

      return leaderboard;
    } catch (error) {
      throw new Error('Failed to fetch leaderboard data');
    }
  }, [nUsers]);

  useEffect(() => {
    ; (async () => {
      try {
        scrollPosition.current = window.pageYOffset || document.documentElement.scrollTop;
        setLeaderboard(await fetchLeaderboard()) // Fetch leaderboard data and set state
      } catch (error) {
        setError(error.message) // Set error state if fetch fails
      }
    })()
  }, [fetchLeaderboard])

  useEffect(() => {
    window.scrollTo(0, scrollPosition.current);
  }, [leaderboard])

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>{t("leaderboard.title")}</h1>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <TableContainer component={Paper} style={{ width: '75%' }}>
          <Table sx={{ minWidth: 600 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">{t("leaderboard.header.ranking")}</StyledTableCell>
                <StyledTableCell align="center">{t("leaderboard.header.username")}</StyledTableCell>
                <StyledTableCell align="center">{t("leaderboard.header.correct_answers")}</StyledTableCell>
                <StyledTableCell align="center">{t("leaderboard.header.incorrect_answers")}</StyledTableCell>
                <StyledTableCell align="center">{t("leaderboard.header.games_played")}</StyledTableCell>
                <StyledTableCell align="center">{t("leaderboard.header.total_time")}</StyledTableCell>
                <StyledTableCell align="center">{t("leaderboard.header.points")}</StyledTableCell>
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

                  <StyledTableCell align="center">
                    <Link to={`../profile/${row.username}`} className="username-profile">
                      {row.username}
                    </Link>
                  </StyledTableCell>
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
      {!disableButton && <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <Button onClick={() => setNUsers(nUsers + 10)} className="showmore-button">
          Show more
        </Button>
      </div>}
    </div >
  );
};

export default Leaderboard;
