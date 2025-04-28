// Scatter Plot - Energy Consumption vs Star Rating
(() => {
    const scatterSVG = d3.select("#scatter-plot")
      .append("svg")
      .attr("viewBox", "0 0 600 400")
      .attr("preserveAspectRatio", "xMidYMid meet");
    
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
      
        const xScale = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.star) + 1])
          .range([0, width]);
      
        const yScale = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.energy) * 1.1])
          .range([height, 0]);
      
        scatterChart.append("g")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(xScale).ticks(6));
      
        scatterChart.append("g")
          .call(d3.axisLeft(yScale));
      
        scatterChart.selectAll("circle")
          .data(data)
          .join("circle")
          .attr("cx", d => xScale(d.star))
          .attr("cy", d => yScale(d.energy))
          .attr("r", 3)
          .attr("fill", "steelblue");
    
        // Add X-axis label
        scatterChart.append("text")
          .attr("x", width / 2)
          .attr("y", height + margin.bottom - 10)
          .attr("text-anchor", "middle")
          .style("font-family", "sans-serif")
          .style("font-size", "12px")
          .text("Star Rating");
    
        // Add Y-axis label
        scatterChart.append("text")
          .attr("x", -height / 2)
          .attr("y", -margin.left + 15)
          .attr("transform", "rotate(-90)")
          .attr("text-anchor", "middle")
          .style("font-family", "sans-serif")
          .style("font-size", "12px")
          .text("Energy Consumption (kWh)");
      });
    })();