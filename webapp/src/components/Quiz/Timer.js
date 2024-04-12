import './Timer.css'

import Countdown, { zeroPad } from 'react-countdown'
import { ReactComponent as StopwatchIcon } from '../../assets/stopwatch-solid.svg'

function Timer({ timer, id, onComplete, innerRef }) {
  const renderer = ({ minutes, seconds }) => {
    return (
      <span>
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    )
  }

  return (
    <p className="quiz-timer">
      <StopwatchIcon />
      <Countdown
        date={timer}
        key={id}
        renderer={renderer}
        onComplete={onComplete}
        ref={innerRef}
      />
    </p>
  )
}

export default Timer
