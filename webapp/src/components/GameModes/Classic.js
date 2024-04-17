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
            <h2>{t('play.gamemode.classic.title')}</h2>
            <div className="button-container">
              <Button onClick={changeDifficultyTo('easy')}>
                {t('play.gamemode.classic.easy')}
              </Button>
              <Button onClick={changeDifficultyTo('medium')}>
                {t('play.gamemode.classic.medium')}
              </Button>
              <Button onClick={changeDifficultyTo('hard')}>
                {t('play.gamemode.classic.hard')}
              </Button>
              <Button onClick={goBack} className="danger">
                {t('play.gamemode.classic.go_back_button')}
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
