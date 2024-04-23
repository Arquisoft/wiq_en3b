import './FinalResult.css'

import Button from '../Button/Button'
import { useTranslation } from 'react-i18next'

const FinalResult = ({ result, quizLength, points, onPlayAgain, goBack }) => {
  const { t } = useTranslation()

  return (
    <div className="final-result">
      <h1>{t('play.result.title')}</h1>
      <p>
        {quizLength !== 0
          ? t('play.result.questions', { correct: result, total: quizLength })
          : t('play.result.simple_questions', { correct: result })}
      </p>
      <p>{t('play.result.points', { points: points })}</p>
      <Button onClick={onPlayAgain}>{t('play.result.play_again')}</Button>
      <Button onClick={goBack} className="danger">
        {t('play.result.go_back_button')}
      </Button>
    </div>
  )
}

export default FinalResult
