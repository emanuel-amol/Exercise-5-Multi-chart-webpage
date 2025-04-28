// Scatter Plot - Energy vs Star Rating
const scatterSVG = d3.select("#scatter-plot")
  .append("svg")
  .attr("viewBox", "0 0 600 400")
  .style("border", "1px solid black");

d3.csv("./data/Ex5_TV_energy.csv", d => ({
  brand: d.Brand,
  energy: +d.Energy_Consumption,
  star: +d.Star_Rating
})).then(data => {
  console.log("Scatter Plot Data:", data);

  // TODO: Build the scatter plot with data here
});
