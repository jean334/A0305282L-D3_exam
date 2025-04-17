import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import VizContainer from "../Components/VizContainer";

import BarChart from "../Components/BarChart";
import TreeMap from "../Components/TreeMap";
import BarRace from "../Components/BarRace";
import Histogram from "../Components/Histogram";
import ParallelPlot from "../Components/ParallelPlot";
import DashboardIntroduction from "../Components/DashboardIntro";
import SecondParagraphe from "../Components/SecondParagraphe";
import HistogramText from "../Components/HistogramText";
import ParallelPlotText from "../Components/ParallelPlotText";
import HistogramAssignment from "../Components/HistogramAssignement";

const GroupsHive = [
    "Art", "Business_Studies", "Citizenship", 
    "Design_and_Technology", "Geography", "IT", "Language_and_literature", 
    "Music", "Religion", "People", "Everyday_life", 
    "Science", "History"
  ];
  
  const BarRaceText = "This visualization is a bar race chart representing the number of active users (in millions) for each social media platform from January 2017 to October 2024. It highlights the rapid growth in user adoption, emphasizing the universal expansion of social media across different platforms. The data comes from multiple sources and has been manually aggregated into a JSON file. In most cases, user counts are averaged per quarter, but some platforms—such as Telegram—have data with a lower resolution. For recent dates, some figures are not consistently reported, which explains why Facebook's user count remains unchanged after 2022."
  const TreeMapText = "This visualization is a treemap. Each color group represents a social network (refer to the legend for details). The subdivisions correspond to different emotions, with their proportions reflected in the size of each rectangle (and the percentage displayed inside)."
  
  
  const BarChartText = "This visualization is a bar chart showing the proportion of positive, negative, or neutral messages (depending on the selected button) on Instagram, Twitter, and Facebook over the period controlled by the double slider. If a specific time range is selected, the percentage is averaged over that period."
  const HistogramPlotText = "This histogram represents a sample of tweets identified as originating from Russian troll bots. The bars are aggregated on a weekly basis, with their height reflecting the number of tweets posted each week."
  const ParallelText = "Each link in the parallel plot represents a Twitter user. The plot consists of five axes: the account creation date, the number of followers (Twitter accounts following this account), the number of accounts it follows, the total number of public posts created by the account, and the number of lists in which the account appears."
  
  
  

function Home() {
    return(
      <div className="App">
        <div className="top-container">
          <div className="logo-container">
            <img src="./socialmedia.png" alt="SocialMedia" width="140"/>
          </div>
          <div className="title-container">
            <h1 className="page-title">Social Media Analysis</h1>
          </div>
      </div>

  
      <div className="bar-race-viz">
        <VizContainer viz={HistogramAssignment} title={"Number of Monthly Social Media Active Users in Millions"} groups={GroupsHive} text={BarRaceText} hasSidePanel={false}/>
      </div>
    </div>
  );
  }
  
  export default Home;
  