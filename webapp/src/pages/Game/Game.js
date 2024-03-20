import Quiz from '../../components/Quiz/Quiz'
import { useQuestions } from '../../hooks/useQuestions'

const Game = () => {
  const { questions } = useQuestions()

  if (!questions.length) {
    return <div className="quiz-wrapper"></div>
  }

  return (
    <div className="quiz-wrapper">
      <Quiz questions={questions} time={15} />
    </div>
  )
}

export default Game
