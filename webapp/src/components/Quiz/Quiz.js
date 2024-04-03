import "./Quiz.css";

import React, { useState, useRef, useEffect } from "react";
import Countdown, { zeroPad } from "react-countdown";
import Question from "./Question";
import FinalResult from "../FinalResult/FinalResult";
import CircularProgress from '@mui/material/CircularProgress';
import { ReactComponent as StopwatchIcon } from "../../assets/stopwatch-solid.svg";

const Quiz = (props) => {

  const apiEndpoint = "http://localhost:8000"

  var [questions, setQuestions] = useState([])

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizData, setQuizData] = useState({});

  const [haveQuestions, setHaveQuestions] = useState(false)

  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const [timer, setTimer] = useState(Date.now() + props.timerValue * 1000);
  const [timerIndex, setTimerIndex] = useState(0);
  const countdownTimer = useRef();

  useEffect(() => {
    ; (async () => {
      if (!haveQuestions) {
        setQuestions(await getQuestions())
        setHaveQuestions(true)
      }
    })()
  }, [haveQuestions])

  useEffect(() => {
    if (questions) {
      setTimer(Date.now() + props.timerValue * 1000)
    }
  }, [questions])


  const getQuestions = async () => {

    let numQuestions = 0

    console.log(props.level)

    if (props.level === "easy") numQuestions = 1
    else if (props.level === "medium") numQuestions = 3
    else if (props.level === "hard") numQuestions = 5

    console.log("Fetching " + numQuestions + " questions")

    const response = await fetch(apiEndpoint + `/questions?size=${numQuestions}`)

    if (!response.ok) throw new Error("Failed to fetch questions")

    const data = await response.json()

    data.forEach(question => { question.answers = shuffle(question.answers) })

    console.log(data)

    return data
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

        // And swap it with the current element.
        ;[array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex]
        ]
    }
    return array
  }

  // This function is used to render the countdown timer
  const renderer = ({ minutes, seconds }) => {
    return (
      <span>
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    )
  }

  const setData = (selectedAnswerId, correctIAnswerId) => {
    setQuizData({
      selectedId: selectedAnswerId,
      correctId: correctIAnswerId,
    });
  };

  //This function is used to handle the selection of an answer
  const selectAnswerHandler = selectedAnswerId => {
    // Set the selected state to the selected answer
    setData(selectedAnswerId, questions[currentQuestionIndex].correctAnswerId);

    // If the button is disabled, ignore the click
    if (btnDisabled) {
      return
    }

    // Check if the selected answer is correct
    const isCorrect = questions[currentQuestionIndex].correctAnswerId === selectedAnswerId;

    // If the selected answer is correct, increment the score
    if (isCorrect) {
      setScore(score + 1)
    }

    // Disable the button
    setBtnDisabled(true)

    // Move to the next question or finish the quiz
    setTimeout(() => {

      if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      else setIsFinished(true);

      // Reset state for the next question
      setQuizData({})
      setBtnDisabled(false)
      setTimer(Date.now() + time * 1000)
      setTimerIndex(prevTimerIndex => prevTimerIndex + 1)
    }, 2000)

    // Pause the timer
    pauseTimer()
  }

  const tryAgainHandler = () => {
    setHaveQuestions(false)
    setCurrentQuestionIndex(0);
    setQuizData({});
    setIsFinished(false);
    setScore(0);
    setBtnDisabled(false);
    setTimer(Date.now() + props.timerValue * 1000);
    setTimerIndex((prevState) => { return prevState + 1; });
  };

  const countdownCompleteHandler = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevState) => {
        return prevState + 1;
      });

      setTimer(Date.now() + time * 1000)
      setTimerIndex(prevState => {
        return prevState + 1
      })
    } else {
      setIsFinished(true)
    }
  }

  const pauseTimer = () => countdownTimer.current.pause();

  const resumeTimer = () => countdownTimer.current.start();

  return (
    <React.Fragment>


      {!haveQuestions && <CircularProgress size={25} color='inherit' />}

      {haveQuestions && isFinished &&
        <FinalResult result={score} quizLength={questions.length} onTryAgain={tryAgainHandler} />}

      {haveQuestions && !isFinished && <>
        <p className="quiz-timer">
          <StopwatchIcon />
          <Countdown date={timer} key={timerIndex} renderer={renderer} onComplete={countdownCompleteHandler} ref={countdownTimer} />
        </p>
        <Question
          quiz={questions[currentQuestionIndex]}
          activeQuizIndex={currentQuestionIndex + 1}
          quizLength={questions.length}
          quizLength={questions.length}
          selected={quizData}
          btnDisabled={btnDisabled}
          onSelectAnswer={selectAnswerHandler}
        />
      </>
      }
    </React.Fragment>
  )
}

export default Quiz
