import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';

const KnowAndWin = () => {
  const history = useHistory();
  
  const handleStartButtonClick = () => {
    history.push('/signup');
  };

  return (
    <div>
      <div className="header">
        <a href="#" className="thatstyle">Know & Win</a>
      </div>
      <div className="content">
        <h1 className="thatstyle">Welcome to Know & Win!</h1>
        <p>Press Start! to start up the game</p>
        <button className="login-button" onClick={handleStartButtonClick}>Start!</button>
      </div>
    </div>
  );
}

export default KnowAndWin;
