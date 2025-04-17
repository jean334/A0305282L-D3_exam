import * as d3 from "d3";
import { useState, useEffect } from "react";
import Query1_slider from "./Query1_slider";

function Query1() {
    const [data, setData] = useState(null);
  
    useEffect(() => {
      d3.dsv(",", "/assets/source_hist.csv", (d) => ({
        source: d.source,
        count: +d.count,
      })).then((loadedData) => {
        setData(loadedData);
      });
    }, []);
  
    if (!data) return <p>Loading viz...</p>;
  
    return <GraphVisualization data={data} />;
  }
  function GraphVisualization({data}){
    
      const width = window.innerWidth ;
      const height = 500;
      const marginTop = 20;
      const marginRight = 0;
      const marginBottom = 120;
      const marginLeft = 40;
      const [count, setCount] = useState(0);
      const [maxValue, setMaxValue] = useState(40);
      const [barRadius, setBarRadius] = useState(2);
  
  useEffect(() => {
      d3.select("#hist-container").select("svg").remove(); 
      const filteredData = data.slice(0, count ); 
      //setMaxValue(d3.max(filteredData, d => d.count));
      const x = d3.scaleBand()
          .domain(filteredData.map(d => d.source))
          .range([marginLeft, width - marginRight])
          .padding(0.1);

      let countEngines = filteredData.length;
      setBarRadius(countEngines >= 40 ? 2 : countEngines >= 20 ? 4 : 6);

      const tickValues = filteredData
          .map(d => d.engine)
          .filter((_, i) => {
            if (countEngines >= 40) {
              return i % 3 === 0;
            } else if (countEngines >= 20) {
              return i % 2 === 0;
            } else {
              return i % 1 === 0;
            }
          });

      const xAxis = d3.axisBottom(x)
          //.tickValues(tickValues) 
          .tickSizeOuter(0);
  
      const y = d3.scaleLinear()
          .domain([0, d3.max(filteredData, d => d.count)]).nice()
          .range([height - marginBottom, marginTop]);
  
      const svg = d3.select("#hist-container")
          .append("svg")
          .attr("viewBox", [0, 0, width, height])
          .attr("width", width)
          .attr("height", height)
          .attr("style", "max-width: 100%; height: auto;")
          .call(zoom);

      const defs = svg.append("defs");
      const gradient = defs
        .append("linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("y1", "100%")
        .attr("x2", "50%")
        .attr("y2", "0%");
        
      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#ffafcc"); 
      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#cdb4db"); 


      const barsGroup = svg.append("g").attr("class", "bars");

      const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "#333")
      .style("color", "white")
      .style("padding", "5px 10px")
      .style("border-radius", "5px")
      .style("display", "none")
      .style("pointer-events", "none");
    
    function animateBars() {
      const indices = d3.shuffle(d3.range(filteredData.length));
      const shuffledData = indices.map(i => filteredData[i]);
    
      const bars = barsGroup.selectAll("rect")
        .data(shuffledData, d => d.source);
    
      bars.enter()
        .append("rect")
        .attr("x", d => x(d.source))
        .attr("y", y(0))
        .attr("height", 0)
        .attr("rx", barRadius)
        .attr("ry", barRadius)
        .attr("fill", "url(#gradient)")
        .attr("width", x.bandwidth())
        .on("mouseover", function (event, d) {
          d3.select(this)
            .attr("fill", "#ffcc00"); 
    
          tooltip.style("display", "block")
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 10}px`)
            .text(`${d.source} : ${d.count}`);
        })
        .on("mousemove", function (event) {
          tooltip.style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 10}px`);
        })
        .on("mouseout", function () {
          d3.select(this)
            .attr("fill", "url(#gradient)");
    
          tooltip.style("display", "none");
        })
        .transition()
        .duration(800)
        .delay((d, i) => i * 200 / filteredData.length)
        .attr("y", d => y(d.count))
        .attr("height", d => y(0) - y(d.count))
        .ease(d3.easeBackOut);
    }
  
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis)
      .selectAll("text")  
      .style("text-anchor", "end") 
      .attr("dx", "-0.5em")  
      .attr("dy", "-0.2em") 
      .attr("transform", "rotate(-45)");

  
      svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove());
  
      animateBars();
  
      function zoom(svg) {
        const extent = [[marginLeft, marginTop], [width - marginRight, height - marginTop]];
      
        svg.call(d3.zoom()
          .scaleExtent([1, 8])
          .translateExtent(extent)
          .extent(extent)
          .on("zoom", zoomed));
      
        function zoomed(event) {
          x.range([marginLeft, width - marginRight].map(d => event.transform.applyX(d)));
      
          svg.selectAll(".bars rect")
            .attr("x", d => x(d.source))
            .attr("width", x.bandwidth());
          svg.select(".x-axis").call(xAxis);
        }
      }
      console.log("count", count);
  
    }, [data, count]);
    return (
      <div id="hist-container">
        <div className="slider-container">
          <Query1_slider count={count} setCount={setCount} className="slider-intra"  htmlFor="intra_link" label="N" maxValue={maxValue}/>
        </div>
      </div>
    );
  
  }
  
  export default Query1;