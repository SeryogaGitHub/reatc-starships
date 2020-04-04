import React from 'react';
import {NavLink, Route} from "react-router-dom";
import ShipsContainer from "./components/Ships/ShipsContainer";
import './App.css';
import ShipContainer from "./components/Ships/ShipContainer";

function App() {
  return (
    <div className="center">
      <NavLink to='/' className={'link'}>Main page</NavLink>
      <Route exact path='/' render={() => <ShipsContainer/>}/>
      <Route exact path='/search=:search&page=:page' render={() => <ShipsContainer/>}/>
      <Route exact path='/starship/:userId?' render={() => <ShipContainer/>}/>
    </div>
  );
}

export default App;
