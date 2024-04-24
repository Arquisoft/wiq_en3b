import { useState } from 'react'
import Button from '../../components/Button/Button'
import './Game.css'
import Classic from '../../components/GameModes/Classic'
import Hardcore from '../../components/GameModes/Hardcore'
import Custom from '../../components/GameModes/Custom'

import { useTranslation } from 'react-i18next'

const Game = () => {
  const [gamemode, setGamemode] = useState()

  const { t } = useTranslation()

  const goBack = () => {
    setGamemode(null)
  }

  const changeToGameMode = gamemode => () => {
    setGamemode(gamemode)
  }

  return (
    <>
      {!gamemode && (
        <div className="quiz-wrapper">
          <div className="header-and-buttons-container">
            <h2>{t('play.gamemode.title')}</h2>
            <div className="button-container">
              <Button onClick={changeToGameMode('classic')}>{t("play.gamemode.classic.button")}</Button>
              <Button onClick={changeToGameMode('hardcore')}>{t('play.gamemode.hardcore.button')}</Button>
              <Button onClick={changeToGameMode('custom')}>{t("play.gamemode.custom.button")}</Button>
            </div>
          </div>
        </div>
      )}
      {gamemode === 'classic' && <Classic goBack={goBack} />}
      {gamemode === 'hardcore' && <Hardcore goBack={goBack} />}
      {gamemode === 'custom' && <Custom goBack={goBack} />}
    </>
  )
}

export default Game
