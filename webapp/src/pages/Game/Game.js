import Quiz from '../../components/Quiz/Quiz'
import Button from '../../components/Button/Button'

import './Game.css'

import { useTranslation } from 'react-i18next'
import { useDifficulty } from '../../hooks/useDifficulty'

const Game = () => {
  const { difficulty, switchDifficulty } = useDifficulty()
  const { t } = useTranslation()

  const changeDifficultyTo = difficulty => () => {
    switchDifficulty(difficulty)
  }

  return (
    <div className="quiz-wrapper">
      {!difficulty && (
        <div className="header-and-buttons-container">
          <h2>{t('play.choose_difficulty')}</h2>
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
          </div>
        </div>
      )}
      {difficulty && <Quiz configuration={difficulty} />}
    </div>
  )
}

export default Game
