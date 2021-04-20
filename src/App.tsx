import React,{useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import * as SIMS from './simulation'

import {Home} from './Home';

export const App = () => { //Functional Component

  useEffect(()=>{ // onmount
  },[])

  return (
        <Switch>
          <Route exact path = '/' component = {Home}/>
          <Route exact path = '/testsim' component = {SIMS.BlankTestSim} />
          <Route exact path = '/particlesim' component = {SIMS.BasicParticleSim} />
          <Route exact path = '/orbitsim' component = {SIMS.OrbitSim} />
          <Route exact path = '/pegboard' component = {SIMS.pegboardSim} />
          <Route exact path = '/universal-gravitation' component = {SIMS.threeBodySim} />
        </Switch>
  );
}