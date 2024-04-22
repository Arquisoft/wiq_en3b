import './FinalResult.css'

import XButton from '../XButton/XButton'
import Button from '../Button/Button'
import { useTranslation } from 'react-i18next'

const FinalResult = ({ result, quizLength, points, onPlayAgain, goBack }) => {
  const { t } = useTranslation()
  
  return (
    <div className="final-result">
      <h1>{t("play.result.title")}</h1>
      <p>
        {t("play.result.questions", { correct: result, total: quizLength })}
      </p>
      <p>{t("play.result.points", { points: points })}</p>
      <Button onClick={onPlayAgain}>{t("play.result.play_again")}</Button>

      <XButton href="https://twitter.com/intent/tweet"></XButton>

      <Button onClick={goBack} className="danger">
        {t("play.result.go_back_button")}
      </Button>
    </div>
  )
}

export default FinalResult
