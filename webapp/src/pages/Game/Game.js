import Quiz from '../../components/Quiz/Quiz'
import { useQuestions } from '../../hooks/useQuestions'
import { useSettings } from '../../hooks/useSettings'
import { useToggle } from '../../hooks/useToggle'
import Button from '../../components/Button/Button'

const Game = () => {
  const { questions } = useQuestions()
  const { time } = useSettings()
  const [isGameStarted, toggleGameStarted] = useToggle(false)

  const areQuestionsAvailable = Boolean(questions.length)

  if (!isGameStarted) {
    return (
      <div className="quiz-wrapper">
        <div style={{ marginTop: 20, marginBottom: 10 }}>
          Do you want to start the game? Click on the following button
        </div>
        <Button onClick={toggleGameStarted} disabled={!areQuestionsAvailable}>
          Start game
        </Button>
      </div>
    )
  }

  return (
    <div className="quiz-wrapper">
      <Quiz questions={questions} time={time} />
    </div>
  )
}

export default Game
