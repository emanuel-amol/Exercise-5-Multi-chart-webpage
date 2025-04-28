// Scatter Plot - Energy vs Star Rating
const scatterSVG = d3.select("#scatter-plot")
  .append("svg")
  .attr("viewBox", "0 0 600 400")
  .style("border", "1px solid black");

  // Margin convention
const margin = { top: 30, right: 30, bottom: 50, left: 60 },
width = 600 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;

const scatterChart = scatterSVG.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

  d3.csv("./data/Ex5_TV_energy.csv", d => ({
    brand: d.brand,
    energy: +d.energy_consumpt,
    star: +d.star2
})).then(data => {
  console.log("Scatter Plot Data:", data);

    // X Scale (Star Rating)
    const xScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.star) - 0.5, d3.max(data, d => d.star) + 0.5])
    .range([0, width]);

      // Y Scale (Energy Consumption)
  const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.energy) * 1.1])
  .range([height, 0]);

  // X Axis
  scatterChart.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // Y Axis
  scatterChart.append("g")
    .call(d3.axisLeft(yScale));

    scatterChart.append("text")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom - 5)
    .attr("text-anchor", "middle")
    .text("Star Rating");

  // Y Axis label
  scatterChart.append("text")
    .attr("x", -height / 2)
    .attr("y", -margin.left + 15)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Energy Consumption (kWh)");

     // Plot Points
  scatterChart.selectAll("circle")
  .data(data)
  .join("circle")
  .attr("cx", d => xScale(d.star))
  .attr("cy", d => yScale(d.energy))
  .attr("r", 4)
  .attr("fill", "steelblue");

});