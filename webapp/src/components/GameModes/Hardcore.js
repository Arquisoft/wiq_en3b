import Button from '../Button/Button'
import Quiz from '../Quiz/Quiz'
import '../../pages/Game/Game.css'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function Hardcore({ goBack }) {
  const [hasFinishedConfiguration, setHasFinishedConfiguration] =
    useState(false)
  const { t } = useTranslation()

  return (
      <div className="quiz-wrapper">
        {!hasFinishedConfiguration && (
          <div className="header-and-buttons-container">
            <h2>{t('play.gamemode.hardcore.title')}</h2>
            <p className="quiz-mode-description">
            {t('play.gamemode.hardcore.description')}
            </p>
            <div className="button-container">
              <Button
                onClick={() => {
                  setHasFinishedConfiguration(true)
                }}
              >
                {t('play.gamemode.custom.start_button')}
              </Button>
              <Button onClick={goBack} className="danger">
                {t('play.gamemode.classic.go_back_button')}
              </Button>
            </div>
          </div>
        )}
        {hasFinishedConfiguration && (
          <Quiz
            configuration={{
              numberOfQuestions: 0,
              pointsPerQuestion: 10,
              timePerQuestion: 10,
              questionTypes: [],
            }}
            goBack={goBack}
          />
        )}
      </div>
  )
}

export default Hardcore
