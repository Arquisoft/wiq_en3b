import React, { useState, useRef } from 'react'
import Countdown, { zeroPad } from 'react-countdown'

import './Quiz.css'

import ActiveQuiz from './ActiveQuiz'
import FinalResult from '../FinalResult/FinalResult'

import { ReactComponent as StopwatchIcon } from '../../assets/stopwatch-solid.svg'

const Quiz = ({ questions, time }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [quizData, setQuizData] = useState({})
  const [isFinished, setIsFinished] = useState(false)
  const [score, setScore] = useState(0)
  const [btnDisabled, setBtnDisabled] = useState(false)

  const [timer, setTimer] = useState(Date.now() + time * 1000)
  const [timerIndex, setTimerIndex] = useState(0)

  const countdownTimer = useRef()

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
    })
  }

  //This function is used to handle the selection of an answer
  const selectAnswerHandler = selectedAnswerId => {
    // Set the selected state to the selected answer
    setData(selectedAnswerId, questions[currentQuestionIndex].correctAnswerId)

    // If the button is disabled, ignore the click
    if (btnDisabled) {
      return
    }

    // Check if the selected answer is correct
    const isCorrect =
      questions[currentQuestionIndex].correctAnswerId === selectedAnswerId

    // If the selected answer is correct, increment the score
    if (isCorrect) {
      setScore(score + 1)
    }

    // Disable the button
    setBtnDisabled(true)

    // Move to the next question or finish the quiz
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1)
      } else {
        setIsFinished(true)
      }

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
    setCurrentQuestionIndex(0)
    setQuizData({})
    setIsFinished(false)
    setScore(0)
    setBtnDisabled(false)
    setTimer(Date.now() + time * 1000)
    setTimerIndex(prevState => {
      return prevState + 1
    })
  }

  const countdownCompleteHandler = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevState => {
        return prevState + 1
      })

      setTimer(Date.now() + time * 1000)
      setTimerIndex(prevState => {
        return prevState + 1
      })
    } else {
      setIsFinished(true)
    }
  }

  const pauseTimer = () => countdownTimer.current.pause()
  console.log(questions)

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
        <ActiveQuiz
          quiz={questions[currentQuestionIndex]}
          activeQuizIndex={currentQuestionIndex + 1}
          quizLength={questions.length}
          selected={quizData}
          btnDisabled={btnDisabled}
          onSelectAnswer={selectAnswerHandler}
        />
      )}
    </React.Fragment>
  )
}

export default Quiz
