import logo from './logo.svg';
import './App.css';
import { BaseList } from "./component/BaseList";
import { BaseSelect } from "./component/BaseSelect";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Home } from "./contains/Home";
import { Login } from "./contains/Login";
import { Clock } from "./component/Clock";



function App() {
  const list = ['lisa', 'jennie', 'rose', 'jiso'];
  const selects = ['lisa', 'jennie', 'rose', 'jiso'];



  return (
    <Router>

      <div id='root' className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>

          {/*<BaseList list={list} />*/}
          {/*<BaseSelect name='BLACKPINK' id='BLINKS' options={selects} defaultValue='jennie' />*/}


            <nav>
              <ul>
                <li><Link to="/home" >Home</Link></li>
                <li><Link to="/clock" >Clock</Link></li>
                <li><Link to="/login" >Login</Link></li>
              </ul>
            </nav>
            <Switch>
              <Route path={'/home'}>
                <Home />
              </Route>
              <Route path={'/clock'}>
                <Clock />
              </Route>
              <Route path={"/login"}>
                <Login />
              </Route>
            </Switch>



        </header>



      </div>



    </Router>
  );
}
// setInterval( (timer) => {this.setState},1000);
export default App;
