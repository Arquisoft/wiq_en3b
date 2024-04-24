import './FinalResult.css'

import XButton from '../XButton/XButton'
import Button from '../Button/Button'
import { useTranslation } from 'react-i18next'

const FinalResult = ({ result, quizLength, points, onPlayAgain, goBack }) => {
  const { t } = useTranslation()

  const tweetUrl = "https://twitter.com/intent/tweet"
  
  // https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview
  let tweetToShare = tweetUrl + "?text="  + t("play.result.tweetShare",{correct: result, total: quizLength, points: points})
  tweetToShare += "&url=https://www.kawgame.xyz%0A"
  tweetToShare += "&hashtags=kaw,wikidata,know,win,game" 

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
      <XButton href={tweetToShare} textShare={t('play.result.xshare_button')}></XButton>
      <Button onClick={goBack} className="danger">
        {t('play.result.go_back_button')}
      </Button>
    </div>
  )
}

export default FinalResult
