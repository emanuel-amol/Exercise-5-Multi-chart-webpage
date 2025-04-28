// Create SVG once
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 500 1600") // Initial viewBox
  .style("border", "1px solid black");

  
// Function to draw bar chart
const createBarChart = (data) => {

  svg.attr("viewBox", `0 0 500 ${data.length * 30}`);

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([0, 500]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, data.length * 30])
    .padding(0.2);

  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  barAndLabel
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "blue");

  barAndLabel
    .append("text")
    .text(d => d.brand)
    .attr("x", 490)
    .attr("fill", "black")
    .attr("y", yScale.bandwidth() / 2)
    .attr("text-anchor", "end")
    .attr("alignment-baseline", "middle")
    .style("font-family", "sans-serif")
    .style("font-size", "13px");

  barAndLabel
    .append("text")
    .text(d => d.count)
    .attr("x", d => xScale(d.count) + 4)
    .attr("y", yScale.bandwidth() / 2)
    .attr("alignment-baseline", "middle")
    .style("font-family", "sans-serif")
    .style("font-size", "13px");
};

// Load data
d3.csv("./data/tvBrandCount.csv", d => ({
  brand: d.brand,
  count: +d.count
})).then(data => {
  // Sort by count descending
  data.sort((a, b) => b.count - a.count);
  data = data.sort((a, b) => b.count - a.count).slice(0, 10);


  // (Optional) Keep only Top 10
  // data = data.slice(0, 10);

  console.log(data);

  createBarChart(data);
});