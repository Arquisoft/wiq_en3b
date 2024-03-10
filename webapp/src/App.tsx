import React from 'react';

const KnowAndWin: React.FC = () => {
  
  const handleStartButtonClick = () => {
    console.log("Button clicked!");
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Know and Win</title>
        <link rel="stylesheet" type="text/css" media="screen" href="style.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="header">
          <a href="#" className="thatstyle">
            Know & Win
          </a>
        </div>
        <div className="content">
          <h1 className="thatstyle">Welcome to Know & Win!</h1>
          <p>Press Start! to start up the game</p>
          <button className="login-button" onClick={handleStartButtonClick}>Start!</button>
        </div>
      </body>
    </html>
  );
}

export default KnowAndWin;
