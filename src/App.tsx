import React,{useState, useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import * as SIMS from './simulation'
import './css/App.css'

import {Home} from './Home';

export const App = () => { //Functional Component

  useEffect(()=>{ // onmount
  },[])


  //TODO: deploy base mvp to github pages
  return (
        <Switch>
          <Route exact path = '/testsim' component = {SIMS.BlankTestSim} />
          <Route exact path = '/' component = {Home}/>
        </Switch>
  );
}