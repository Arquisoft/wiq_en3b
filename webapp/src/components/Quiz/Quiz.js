import "./Quiz.css";
import React, { useState, useRef, useEffect } from "react";
import Countdown, { zeroPad } from "react-countdown";
import Question from "./Question";
import FinalResult from "../FinalResult/FinalResult";
import CircularProgress from '@mui/material/CircularProgress';
import { ReactComponent as StopwatchIcon } from "../../assets/stopwatch-solid.svg";
import { useAuth } from '../../hooks/useAuth'

const getTimerValue = (level) => {

  var timerValue = 0;

  if (level === "easy") timerValue = 30;
  if (level === "medium") timerValue = 15;
  if (level === "hard") timerValue = 5;

  return timerValue;
};

const Quiz = ({ level }) => {
  const apiEndpoint = "http://localhost:8000";

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizData, setQuizData] = useState({});
  const [haveQuestions, setHaveQuestions] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
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
      setTimer(Date.now() + timerValue * 1000);
    }
  }, [questions]);

  useEffect(() => {
    if (isFinished) {
      //updateStatistics();
    }
  }, [isFinished]);

  const getQuestions = async () => {
    let numQuestions = 0;

    if (level === "easy") numQuestions = 5;
    else if (level === "medium") numQuestions = 10;
    else if (level === "hard") numQuestions = 15;

    const response = await fetch(apiEndpoint + `/questions?size=${numQuestions}`);

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
      setScore(score + 1);
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
    setIsFinished(false);
    setScore(0);
    setBtnDisabled(false);
    setTimer(Date.now() + timerValue * 1000);
    setTimerIndex((prevState) => prevState + 1);
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

  const updateStatistics = async () => {
    // Verifica si user está definido y tiene la propiedad history
    if (!user) {
      console.error("User is undefined");
      return;
    }

    console.log("User:", user);
    if (!user.history) {
      console.error("User history is undefined");
      return;
    }

    // const passedQuestions = user.history.passedQuestions || 0;
    // const failedQuestions = user.history.failedQuestions || 0;
    // const gamesPlayed = user.history.gamesPlayed || 0;
    // const timePlayed = user.history.timePlayed || 0;
    // const points = user.history.points || 0;

    const passedQuestions = 10;
    const failedQuestions = 10;
    const gamesPlayed = 10;
    const timePlayed = 10;
    const points = 10;

    const updatedHistory = {
      passedQuestions: passedQuestions + score,
      failedQuestions: failedQuestions + (questions.length - score),
      gamesPlayed: gamesPlayed + 1,
      timePlayed: timePlayed + ((Date.now() - timer) / 1000), // Calculating time played in seconds
      points: points + score,
    };

    const updatedUser = {
      ...user,
      history: updatedHistory
    };

    try {
      const response = await fetch(apiEndpoint + `/history/increment?user=${user.username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error("Failed to update user statistics");
      }

      const responseData = await response.json();
      console.log("User statistics updated successfully:", responseData);
    } catch (error) {
      console.error("Error updating user statistics:", error);
    }
  };


  return (
    <React.Fragment>
      {!haveQuestions && <CircularProgress size={25} color='inherit' />}

      {haveQuestions && isFinished && (
        <FinalResult
          result={score}
          quizLength={questions.length}
          onPlayAgain={playAgainHandler}
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
