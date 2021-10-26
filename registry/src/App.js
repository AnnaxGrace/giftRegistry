  
import React from 'react';

import { HashRouter, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.scss';

// import NavBar from './Components/RunningSections/NavBar';
import Header from './Components/RunningSections/Header';
import LandingPage from './Views/LandingPage';
// import Footer from "./Components/RunningSections/Footer";


function App() {

  return (
    <div className="App">
      <HashRouter basename="/">
        <Header />
        {/* <NavBar /> */}
            <div>
              <Route exact path="/" component={LandingPage} />
            </div>
          </HashRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default App;