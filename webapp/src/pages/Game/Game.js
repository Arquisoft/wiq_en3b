import { useState } from 'react'
import Button from '../../components/Button/Button'
import './Game.css'
import Classic from '../../components/GameModes/Classic'
import Hardcore from '../../components/GameModes/Hardcore'
import Custom from '../../components/GameModes/Custom'

const Game = () => {
  const [gamemode, setGamemode] = useState()

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
            <h2>Select the gamemode</h2>
            <div className="button-container">
              <Button onClick={changeToGameMode('classic')}>Classic</Button>
              <Button onClick={changeToGameMode('hardcore')}>Hardcore</Button>
              <Button onClick={changeToGameMode('custom')}>Custom</Button>
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
