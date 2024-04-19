import './FinalResult.css'

import Button from '../Button/Button'

const FinalResult = ({ result, quizLength, points, onPlayAgain, goBack }) => {
  return (
    <div className="final-result">
      <h1>Final result</h1>
      <p>
        You answered {result} questions correct{' '}
        {quizLength !== 0 && `out of ${quizLength}`}
      </p>
      <p>Your score is {points} points.</p>
      <Button onClick={onPlayAgain}>Play again</Button>
      <Button onClick={goBack} className="danger">
        Go back
      </Button>
    </div>
  )
}

export default FinalResult
