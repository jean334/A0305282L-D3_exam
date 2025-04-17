import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import VizContainer from "./Components/VizContainer";
import About from "./Pages/About";
import DashboardIntroduction from "./Components/DashboardIntro";

import Query1 from "./Components/Query1";
import "./App.css";

const temp = ["foo"];

const Query1_text = "This visualization is an histogram representing the N most popular websites"

const App = () => {
  return (
    <div className="App">
    <Router>
      <header className="header">
        <nav>
          <NavLink to="/" end>Vizualisation</NavLink>
          <NavLink to="/about">About the plots</NavLink>
        </nav>
      </header>

      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      </Routes>
    </Router>
    </div>
    );
  };

function Home() {
  return(
    <div className="App">
      <div className="top-container">
        <div className="logo-container">
        </div>
        <div className="title-container">
          <h1 className="page-title">Final Exam</h1>
        </div>
    </div>

    <div className="text-container">
      <DashboardIntroduction/>
    </div>

    <div className="bar-race-viz">
      <VizContainer viz={Query1} title={"Histogram of the N most popular website"} groups={temp} text={Query1_text} hasSidePanel={false}/>
    </div>

  </div>
);
}

export default App;
