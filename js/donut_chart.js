(() => {
    const donutSVG = d3.select("#donut-chart")
      .append("svg")
      .attr("viewBox", "0 0 500 500")
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("border", "1px solid black");
  
    const width = 500,
          height = 500,
          radius = Math.min(width, height) / 2 - 50;
  
    const donutChart = donutSVG.append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
  
    const color = d3.scaleOrdinal(d3.schemeCategory10);
  
    d3.csv("./data/Ex5_TV_energy_Allsizes_byScreenType.csv", d => ({
        screenTech: d.Screen_Tech,
        meanEnergy: +d["Mean(Labelled energy consumption (kWh/year))"]
      })).then(data => {
        console.log("Donut Chart Data:", data);
  
        const pie = d3.pie()
          .value(d => d.meanEnergy)
          .sort(null);
  
        const arc = d3.arc()
          .innerRadius(radius * 0.5)
          .outerRadius(radius);
  
        donutChart.selectAll("path")
          .data(pie(data))
          .join("path")
          .attr("d", arc)
          .attr("fill", d => color(d.data.screenTech))
          .attr("stroke", "white")
          .style("stroke-width", "2px");
  
        donutChart.selectAll("text")
          .data(pie(data))
          .join("text")
          .text(d => d.data.screenTech)
          .attr("transform", d => `translate(${arc.centroid(d)})`)
          .attr("text-anchor", "middle")
          .style("font-family", "sans-serif")
          .style("font-size", "9px")
          .style("fill", "white");
      });
  })();