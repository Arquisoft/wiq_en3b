import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import KnowAndWin from './KnowAndWin';
import SignUpPage from './SignUpPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={KnowAndWin} />
        <Route exact path="/signup" component={SignUpPage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
