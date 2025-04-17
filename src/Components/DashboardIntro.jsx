import React from "react";
import "./DashboardIntro.css"; 

const DashboardIntroduction = () => {
  return (
    <div className="dashboard-intro-container">
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Introduction</h2>
      <p className="mb-4">
        This visualization is an histogram representing the N most popular referral sites, the given dataset was processed to count the distinct source 
        you can hover each bars, it will change color and give more information, the plot's creation is animated, you can also adjust the number of referral you 
        want to show. You can also zoom in and out on the x axis.

        The main purpose of this plot is to show the most popular referral in a clear and concise manner.
        The histogram allows for easy comparison between different referral, and the animation adds an engaging element to the visualization.
        as the dataset is just a sample of the whole internet traffic, the most important thing is to understand the trend and the most popular referral.

        The python program used to process the dataset is provided.

      </p>
  
    </div>
    </div>
  );
};

export default DashboardIntroduction;
