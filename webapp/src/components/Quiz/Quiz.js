import './Quiz.css'
import Question from './Question'
import FinalResult from '../FinalResult/FinalResult'
import CircularProgress from '@mui/material/CircularProgress'
import { useAuth } from '../../hooks/useAuth'
import { GAME_STATES, useGame } from '../../hooks/useGame'
import i18next from 'i18next'
import Timer from './Timer'

const Quiz = ({ configuration, goBack }) => {
  const { user } = useAuth()
  const {
    resetGame,
    countdownCompleteHandler,
    answerQuestionWith,
    question,
    gameInfo,
    countdownTimer,
  } = useGame({ configuration, language: i18next.language, user })
  const { state, selectedAnswerId, points, passedQuestions, timer } = gameInfo
  const { numberOfQuestions } = configuration

  return (
    <>
      {state === GAME_STATES.loading && (
        <CircularProgress size={25} color="inherit" />
      )}
      {state === GAME_STATES.finished && (
        <FinalResult
          result={passedQuestions}
          quizLength={numberOfQuestions}
          onPlayAgain={resetGame}
          points={points}
          goBack={goBack}
        />
      )}
      {state === GAME_STATES.playing && (
        <>
          <Timer
            timer={timer}
            id={question.id}
            onComplete={countdownCompleteHandler}
            innerRef={countdownTimer}
          />
          <Question
            question={question}
            quizLength={numberOfQuestions}
            answerQuestionWith={answerQuestionWith}
            selectedAnswerId={selectedAnswerId}
          />
        </>
      )}
    </>
  )
}

export default Quiz
