import React from 'react';
import { Switch, Route } from 'react-router-dom'; 
import Header from './Components/Header/Header.Component';

import Home from './Pages/Home/Home.page';
import Directory from './Pages/Directory/Directory.page';
import Employee from './Pages/Employee/Employee.Page';

import './App.css';

const App:React.FC = () => (
  <div className="App">
    <Header />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/directory' component={Directory} />
      <Route path = '/employee' component={Employee} />
    </Switch>
  </div>
);

export default App;
