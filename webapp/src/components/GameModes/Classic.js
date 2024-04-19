import Quiz from '../../components/Quiz/Quiz'
import Button from '../../components/Button/Button'

import '../../pages/Game/Game.css'

import { useTranslation } from 'react-i18next'
import { useDifficulty } from '../../hooks/useDifficulty'

const Classic = ({ goBack }) => {
  const { difficulty, switchDifficulty } = useDifficulty()
  const { t } = useTranslation()

  const changeDifficultyTo = difficulty => () => {
    switchDifficulty(difficulty)
  }

  return (
    <>
      <div className="quiz-wrapper">
        {!difficulty && (
          <div className="header-and-buttons-container">
            <h2>{t('play.choose_difficulty')}</h2>
            <p className="quiz-mode-description">
              Welcome to Classic Mode. Choose your difficulty level and tackle
              the quiz with varying time limits and question counts. Perfect for
              all levels of trivia enthusiasts.
            </p>
            <div className="button-container">
              <Button onClick={changeDifficultyTo('easy')}>
                {t('play.easy')}
              </Button>
              <Button onClick={changeDifficultyTo('medium')}>
                {t('play.medium')}
              </Button>
              <Button onClick={changeDifficultyTo('hard')}>
                {t('play.hard')}
              </Button>
              <Button onClick={goBack} className="danger">
                Go back
              </Button>
            </div>
          </div>
        )}
        {difficulty && <Quiz configuration={difficulty} goBack={goBack} />}
      </div>
    </>
  )
}

export default Classic
