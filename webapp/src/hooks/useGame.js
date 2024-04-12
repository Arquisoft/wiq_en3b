import { useCallback, useEffect, useRef, useState } from 'react'
import { useQuestions } from './useQuestions'
import { incrementHistory } from '../services/apiHistory'

export const GAME_STATES = {
  loading: 'loading',
  playing: 'playing',
  finished: 'finished',
}

const INITIAL_STATE = {
  state: GAME_STATES.loading,
  passedQuestions: 0,
  points: 0,
  questionIndex: 0,
  selectedAnswerId: 0,
  timer: 0,
}

function useGame({ configuration, language, user }) {
  const { numberOfQuestions, timePerQuestion, pointsPerQuestion } =
    configuration
  const { questions, generateNewQuestions } = useQuestions({
    numberOfQuestions,
    language,
  })
  const [gameInfo, setGameInfo] = useState(INITIAL_STATE)
  const startTime = useRef(0)
  const countdownTimer = useRef()
  const question = questions[gameInfo.questionIndex] ?? {}

  useEffect(() => {
    const isThereQuestions = Boolean(questions.length)

    if (isThereQuestions) {
      setGameInfo(gameInfo => ({
        ...gameInfo,
        state: GAME_STATES.playing,
        timer: Date.now() + timePerQuestion * 1000,
      }))
      startTime.current = new Date()
    }
  }, [questions, timePerQuestion])

  const resetGame = useCallback(() => {
    setGameInfo(INITIAL_STATE)
    generateNewQuestions()
  }, [generateNewQuestions])

  const countdownCompleteHandler = useCallback(() => {
    if (gameInfo.questionIndex < questions.length - 1) {
      setGameInfo({
        ...gameInfo,
        questionIndex: gameInfo.questionIndex + 1,
        timer: Date.now() + timePerQuestion * 1000,
      })
    } else {
      setGameInfo({
        ...gameInfo,
        state: GAME_STATES.finished,
      })
    }
  }, [gameInfo, questions.length, timePerQuestion])

  const answerQuestionWith = useCallback(
    id => () => {
      const isCorrect = question.correctAnswerId === id
      let passedQuestions = gameInfo.passedQuestions
      let points = gameInfo.points

      if (isCorrect) {
        passedQuestions += 1
        points += pointsPerQuestion
      }

      setGameInfo({
        ...gameInfo,
        passedQuestions,
        points,
        selectedAnswerId: id,
      })

      setTimeout(() => {
        const hasGameFinished = gameInfo.questionIndex >= questions.length - 1

        if (hasGameFinished) {
          const finishTime = Date.now()

          const history = {
            passedQuestions: gameInfo.passedQuestions,
            failedQuestions: questions.length - gameInfo.passedQuestions,
            gamesPlayed: 1,
            timePlayed: finishTime - startTime.current,
            points: gameInfo.points,
          }

          incrementHistory(user.token, history)
        }

        setGameInfo({
          ...gameInfo,
          passedQuestions,
          points,
          timer: Date.now() + timePerQuestion * 1000,
          selectedAnswerId: 0,
          questionIndex: gameInfo.questionIndex + (hasGameFinished ? 0 : 1),
          state: hasGameFinished ? GAME_STATES.finished : gameInfo.state,
        })
      }, 2000)

      pauseTimer()
    },

    [
      gameInfo,
      pointsPerQuestion,
      question.correctAnswerId,
      questions.length,
      timePerQuestion,
      user.token,
    ]
  )

  const pauseTimer = () => countdownTimer.current.pause()

  return {
    resetGame,
    countdownCompleteHandler,
    answerQuestionWith,
    gameInfo,
    countdownTimer,
    question,
  }
}

export { useGame }
