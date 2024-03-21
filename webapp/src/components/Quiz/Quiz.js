import "./Quiz.css";

import React, { useState, useRef, useEffect } from "react";
import Countdown, { zeroPad } from "react-countdown";
import Question from "./Question";
import FinalResult from "../FinalResult/FinalResult";

import { ReactComponent as StopwatchIcon } from "../../assets/stopwatch-solid.svg";

const Quiz = (props) => {

  //const apiEndpoint = "http://20.117.173.161:8000"
  const apiEndpoint = "http://localhost:8000"

  var [questions, setQuestions] = useState([])
  const [error, setError] = useState(null) // Add error state

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizData, setQuizData] = useState({});

  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const [timer, setTimer] = useState(Date.now() + props.timerValue * 1000);
  const [timerIndex, setTimerIndex] = useState(0);

  const countdownTimer = useRef();

  questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { id: 1, text: "London" },
        { id: 2, text: "Paris" },
        { id: 3, text: "New York" },
        { id: 4, text: "Sydney" },
      ],
      correctAnswerId: 2,
    },
    {
      question: "What is the capital of Germany?",
      answers: [
        { id: 5, text: "Berlin" },
        { id: 6, text: "Paris" },
        { id: 7, text: "New York" },
        { id: 8, text: "Sydney" },
      ],
      correctAnswerId: 5,
    },
    {
      question: "What is the capital of Spain?",
      answers: [
        { id: 9, text: "London" },
        { id: 10, text: "Paris" },
        { id: 11, text: "Madrid" },
        { id: 12, text: "Sydney" },
      ],
      correctAnswerId: 11,
    },
    {
      question: "What is the capital of Italy?",
      answers: [
        { id: 13, text: "London" },
        { id: 14, text: "Rome" },
        { id: 15, text: "New York" },
        { id: 16, text: "Sydney" },
      ],
      correctAnswerId: 14,
    },
    {
      question: "What is the capital of the United States?",
      answers: [
        { id: 17, text: "Washington D.C." },
        { id: 18, text: "Paris" },
        { id: 19, text: "New York" },
        { id: 20, text: "Sydney" },
      ],
      correctAnswerId: 17,
    },
  ];



  useEffect(() => {
    ; (async () => {
      try {
        const questions = await getQuestions()
        setQuestions(questions)
        console.log(questions)
      } catch (error) {
        setError(error.message) // Set error state if fetch fails
      }
    })()
  }, [])


  const getQuestions = async (numQuestions) => {
    if (!numQuestions) {
      numQuestions = 5
    }
    const response = await fetch(apiEndpoint + `/questions?size=${numQuestions}`)
    if (!response.ok) { // Throw error if response is not successful
      throw new Error("Failed to fetch questions")
    }
    const data = await response.json()
    console.log(data)
    data.forEach(question => {
      question.answers = shuffle(question.answers)
    })

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
    );
  };

  const setData = (selectedAnswerId, correctIAnswerId) => {
    setQuizData({
      selectedId: selectedAnswerId,
      correctId: correctIAnswerId,
    });
  };

  //This function is used to handle the selection of an answer
  const selectAnswerHandler = (selectedAnswerId) => {

    // Set the selected state to the selected answer
    setData(selectedAnswerId, questions[currentQuestionIndex].correctAnswerId);

    // If the button is disabled, ignore the click
    if (btnDisabled) {
      return;
    }

    // Check if the selected answer is correct
    const isCorrect = questions[currentQuestionIndex].correctAnswerId === selectedAnswerId;

    // If the selected answer is correct, increment the score
    if (isCorrect) {
      setScore(score + 1);
    }

    // Disable the button
    setBtnDisabled(true);

    // Move to the next question or finish the quiz
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        setIsFinished(true);
      }

      // Reset state for the next question
      setQuizData({});
      setBtnDisabled(false);
      setTimer(Date.now() + props.timerValue * 1000);
      setTimerIndex((prevTimerIndex) => prevTimerIndex + 1);
    }, 2000);

    // Pause the timer
    pauseTimer();
  };

  const tryAgainHandler = () => {
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

      setTimer(Date.now() + props.timerValue * 1000);
      setTimerIndex((prevState) => {
        return prevState + 1;
      });
    } else {
      setIsFinished(true);
    }
  };

  const pauseTimer = () => countdownTimer.current.pause();

  return (
    <React.Fragment>
      {!isFinished && (
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
      )}
      {isFinished ? (
        <FinalResult
          result={score}
          quizLength={questions.length}
          onTryAgain={tryAgainHandler}
        />
      ) : (
        <Question
          quiz={questions[currentQuestionIndex]}
          activeQuizIndex={currentQuestionIndex + 1}
          quizLength={questions.length}
          selected={quizData}
          btnDisabled={btnDisabled}
          onSelectAnswer={selectAnswerHandler}
        />
      )}
    </React.Fragment>
  );
};

export default Quiz;
