// Line Chart - Spot Power Prices 1998-2024
(() => {

const lineSVG = d3.select("#line-chart")
  .append("svg")
  .attr("viewBox", "0 0 600 400")
  .attr("preserveAspectRatio", "xMidYMid meet")
  .style("border", "1px solid black");

// Margin convention
const margin = { top: 30, right: 30, bottom: 50, left: 60 },
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

const lineChart = lineSVG.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

  d3.csv("./data/Ex5_ARE_Spot_Prices.csv", d => ({
    year: +d.Year,
    price: +d["Average Price (notTas-Snowy)"]
  })).then(data => {
    console.log("Line Chart Data:", data);
  

  // X Scale (Years)
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))
    .range([0, width]);

  // Y Scale (Price)
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.price) * 1.1])
    .range([height, 0]);

  // X Axis
  lineChart.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.format("d"))); // Show years without commas

  // Y Axis
  lineChart.append("g")
    .call(d3.axisLeft(yScale));

  // X Label
  lineChart.append("text")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom - 5)
    .attr("text-anchor", "middle")
    .text("Year");

  // Y Label
  lineChart.append("text")
    .attr("x", -height / 2)
    .attr("y", -margin.left + 15)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Spot Power Price ($)");

  // Line Generator
  const line = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.price));

  // Draw the Line
  lineChart.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", line);

});
})();