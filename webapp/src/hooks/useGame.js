import { useCallback, useEffect, useRef, useState } from 'react'
import { useQuestions } from './useQuestions'
import { incrementHistory } from '../services/apiHistory'

export const GAME_STATES = {
  loading: 'loading',
  playing: 'playing',
  finished: 'finished',
}

const QUESTIONS_TO_GENERATE_PER_DEMAND = 4

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
  const { questions, generateNewQuestions, addMoreQuestions } = useQuestions({
    numberOfQuestions:
      numberOfQuestions === 0
        ? QUESTIONS_TO_GENERATE_PER_DEMAND
        : numberOfQuestions,
    language,
  })
  const [gameInfo, setGameInfo] = useState(INITIAL_STATE)
  const startTime = useRef(0)
  const countdownTimer = useRef()
  const question = questions[gameInfo.questionIndex] ?? {}

  useEffect(() => {
    const isThereQuestions = Boolean(questions.length)

    if (isThereQuestions && gameInfo.state === GAME_STATES.loading) {
      setGameInfo(gameInfo => ({
        ...gameInfo,
        state: GAME_STATES.playing,
        timer: Date.now() + timePerQuestion * 1000,
      }))
      startTime.current = new Date()
    }
  }, [questions, timePerQuestion, gameInfo.state])

  const resetGame = useCallback(() => {
    setGameInfo(INITIAL_STATE)
    generateNewQuestions()
  }, [generateNewQuestions])

  const countdownCompleteHandler = useCallback(() => {
    const isHardcoreMode = numberOfQuestions === 0

    if (gameInfo.questionIndex < questions.length - 1 && !isHardcoreMode) {
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
  }, [gameInfo, questions.length, timePerQuestion, numberOfQuestions])

  const answerQuestionWith = useCallback(
    id => () => {
      const isCorrect = question.correctAnswerId === id
      const isHardcoreMode = numberOfQuestions === 0
      let passedQuestions = gameInfo.passedQuestions
      let points = gameInfo.points

      if (isCorrect) {
        passedQuestions += 1
        points += pointsPerQuestion
      }

      if (
        isHardcoreMode &&
        gameInfo.questionIndex + 1 >= questions.length / 2
      ) {
        addMoreQuestions({ amount: QUESTIONS_TO_GENERATE_PER_DEMAND })
      }

      setGameInfo({
        ...gameInfo,
        passedQuestions,
        points,
        selectedAnswerId: id,
      })

      setTimeout(() => {
        const hasGameFinished =
          gameInfo.questionIndex >= questions.length - 1 ||
          (isHardcoreMode && !isCorrect)

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
      addMoreQuestions,
      numberOfQuestions,
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
