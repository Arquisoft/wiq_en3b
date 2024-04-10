import "./Quiz.css";
import React, { useState, useRef, useEffect } from "react";
import Countdown, { zeroPad } from "react-countdown";
import Question from "./Question";
import FinalResult from "../FinalResult/FinalResult";
import CircularProgress from '@mui/material/CircularProgress';
import { ReactComponent as StopwatchIcon } from "../../assets/stopwatch-solid.svg";
import { useAuth } from '../../hooks/useAuth'
import { API_ENDPOINT } from "../../utils/constants";

const getTimerValue = (level) => {
  let timerValue = 0;

  if (level === "easy") timerValue = 30;
  if (level === "medium") timerValue = 15;
  if (level === "hard") timerValue = 5;

  return timerValue;
};

const getPoints = (level) => {
  let points = 0;

  if (level === "easy") points = 5;
  if (level === "medium") points = 15;
  if (level === "hard") points = 30;

  return points;
}

const Quiz = ({ level }) => {

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizData, setQuizData] = useState({});
  const [haveQuestions, setHaveQuestions] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [points, setPoints] = useState(0);
  const [passedQuestions, setPassedQuestions] = useState(0);
  const [startTime, setStartTime] = useState(Date.now()); // Tiempo de inicio
  const [finishTime, setFinishTime] = useState(null); // Tiempo de finalización

  const [btnDisabled, setBtnDisabled] = useState(false);
  const [timerValue] = useState(getTimerValue(level));
  const [timer, setTimer] = useState(null);
  const [timerIndex, setTimerIndex] = useState(0);
  const { user } = useAuth()
  const countdownTimer = useRef();

  useEffect(() => {

    (async () => {
      if (!haveQuestions) {
        setQuestions(await getQuestions());
        setHaveQuestions(true);
      }
    })();

  }, [haveQuestions]);

  useEffect(() => {
    if (questions) {
      setStartTime(Date.now());
      setTimer(Date.now() + timerValue * 1000);
    }
  }, [questions]);

  useEffect(() => {
    if (isFinished) {
      updateStatistics();
    }
  }, [isFinished]);

  const getQuestions = async () => {
    let numQuestions = 0;

    if (level === "easy") numQuestions = 5;
    else if (level === "medium") numQuestions = 10;
    else if (level === "hard") numQuestions = 15;

    const response = await fetch(API_ENDPOINT + `/questions?size=${numQuestions}`);

    if (!response.ok) throw new Error("Failed to fetch questions");

    const data = await response.json();

    data.forEach((question) => {
      question.answers = shuffle(question.answers);
    });

    return data;
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  const renderer = ({ minutes, seconds }) => {
    return (
      <span>
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    );
  };

  const setData = (selectedAnswerId, correctAnswerId) => {
    setQuizData({
      selectedId: selectedAnswerId,
      correctId: correctAnswerId,
    });
  };

  const selectAnswerHandler = (selectedAnswerId) => {
    setData(selectedAnswerId, questions[currentQuestionIndex].correctAnswerId);

    if (btnDisabled) {
      return;
    }

    const isCorrect =
      questions[currentQuestionIndex].correctAnswerId === selectedAnswerId;

    if (isCorrect) {
      setPoints(points + getPoints(level));
      setPassedQuestions(passedQuestions + 1);
    }

    setBtnDisabled(true);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1)
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      else setIsFinished(true);

      setQuizData({});
      setBtnDisabled(false);
      setTimer(Date.now() + timerValue * 1000);
      setTimerIndex((prevTimerIndex) => prevTimerIndex + 1);

    }, 2000);

    pauseTimer();
  };

  const playAgainHandler = () => {
    setHaveQuestions(false);
    setCurrentQuestionIndex(0);
    setQuizData({});
    setBtnDisabled(false);
    setTimer(Date.now() + timerValue * 1000);
    setTimerIndex((prevState) => prevState + 1);
    setPoints(0);
    setPassedQuestions(0);
    setIsFinished(false);
  };

  const countdownCompleteHandler = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevState) => {
        return prevState + 1;
      });

      setTimer(Date.now() + timerValue * 1000);
      setTimerIndex((prevState) => {
        return prevState + 1;
      });
    } else {
      setIsFinished(true);
    }
  };

  const pauseTimer = () => countdownTimer.current.pause();

  const resumeTimer = () => countdownTimer.current.start();

  const updateStatistics = () => {

    const finishTime = Date.now();

    console.log("Milliseconds played:", finishTime - startTime);

    console.log("finish time:", finishTime);
    console.log("start time:", startTime);
    console.log("seconds played:", (finishTime - startTime) / 1000);

    const body = JSON.stringify({
      user: user.token,
      history: {
        passedQuestions: passedQuestions,
        failedQuestions: questions.length - passedQuestions,
        gamesPlayed: 1,
        timePlayed: finishTime - startTime,
        points: points
      }
    });

    try {
      const response = fetch(API_ENDPOINT + `/history/increment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body,
      });

      if (!response.ok) {
        throw new Error("Failed to update user statistics");
      }

    } catch (error) {
      console.error("Error updating user statistics:", error);
    }
  };


  return (
    <React.Fragment>
      {!haveQuestions && <CircularProgress size={25} color='inherit' />}

      {haveQuestions && isFinished && (
        <FinalResult
          result={passedQuestions}
          quizLength={questions.length}
          onPlayAgain={playAgainHandler}
          points={points}
        />
      )}

      {haveQuestions && !isFinished && (
        <>
          <p className="quiz-timer">
            <StopwatchIcon />
            <Countdown
              date={timer}
              key={timerIndex}
              renderer={renderer}
              onComplete={countdownCompleteHandler}
              ref={countdownTimer}
            />
          </p>
          <Question
            quiz={questions[currentQuestionIndex]}
            activeQuizIndex={currentQuestionIndex + 1}
            quizLength={questions.length}
            selected={quizData}
            btnDisabled={btnDisabled}
            onSelectAnswer={selectAnswerHandler}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default Quiz;
