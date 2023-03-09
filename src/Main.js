import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import MP from './MP'
import Dogs from './Dogs';

const Main = () => {
  return (
      <BrowserRouter>
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
        <Route exact path='/' component={MP}></Route>
      <Route exact path='/dogs' component={Dogs}></Route>

    </Switch>
    </BrowserRouter>
  );
}

export default Main;