import './FinalResult.css'

import Button from '../Button/Button'
import { useTranslation } from 'react-i18next'

const FinalResult = props => {

  const { t } = useTranslation()

  return (
    <div className="final-result">
      <h1>{t("play.result.title")}</h1>
      <p>
        {t("play.result.questions", { correct: props.result, total: props.quizLength })}
      </p>
      <p>{t("play.result.points", { points: props.points })}</p>
      <Button onClick={props.onPlayAgain}>{t("play.result.play_again")}</Button>
      <Button onClick={props.goBack} className="danger">
        {t("play.result.go_back_button")}
      </Button>
    </div>
  )
}

export default FinalResult
