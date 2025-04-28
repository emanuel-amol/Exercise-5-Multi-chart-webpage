(() => {
    // Bar Chart - Energy Consumption for 55-Inch TVs
    const barSVG = d3.select("#bar-chart")
      .append("svg")
      .attr("viewBox", "0 0 600 400")
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("border", "1px solid black");
  
    const margin = { top: 30, right: 30, bottom: 70, left: 60 },
          width = 600 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;
  
    const barChart = barSVG.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    d3.csv("./data/Ex5_TV_energy_55inchtv_byScreenType.csv", d => ({
      screenType: d.Screen_Tech, // Corrected column name
      avgEnergy: +d["Mean(Labelled energy consumption (kWh/year))"] // Corrected column name
    })).then(data => {
      console.log("Bar Chart Data:", data);
  
      // X Scale (Screen Type)
      const xScale = d3.scaleBand()
        .domain(data.map(d => d.screenType))
        .range([0, width])
        .padding(0.2);
  
      // Y Scale (Average Energy)
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.avgEnergy) * 1.1])
        .range([height, 0]);
  
      // X Axis
      barChart.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");
  
      // Y Axis
      barChart.append("g")
        .call(d3.axisLeft(yScale));
  
      // X Label
      barChart.append("text")
        .attr("x", width / 2)
        .attr("y", height + 60)
        .attr("text-anchor", "middle")
        .text("Screen Technology");
  
      // Y Label
      barChart.append("text")
        .attr("x", -height / 2)
        .attr("y", -40)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .text("Average Energy Consumption (kWh)");
  
      // Bars
      barChart.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", d => xScale(d.screenType))
        .attr("y", d => yScale(d.avgEnergy))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - yScale(d.avgEnergy))
        .attr("fill", "steelblue");
    });
  })();