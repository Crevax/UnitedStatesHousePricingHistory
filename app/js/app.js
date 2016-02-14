import d3 from 'd3';

export class UnitedStatesHousePricingGraph {
  constructor() {
    let data = priceHistory.years;

    let barHeight = 20;
    let max = d3.max(data, (d) => { return this.medianPriceForYear(d) });

    let x = d3.scale.linear()
      .domain([0, max])
      .range([0, max]);

    let chart = d3.select(".price-chart")
      .attr("width", x(max) / 300 + 180)
      .attr("height", barHeight * data.length);

    let bar = chart.selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("transform", (d, i) => { return "translate(0," + i * barHeight + ")"; });

    bar.append("rect")
      .attr("width", (d) => { return x(this.medianPriceForYear(d)) / 300; })
      .attr("height", barHeight - 1);

    bar.append("text")
      .attr("x", (d) => { return x(this.medianPriceForYear(d)) / 300 + 10; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text((d) => { return "" + d.year });

    bar.append("text")
      .attr("x", (d) => { return x(this.medianPriceForYear(d)) / 300 + 100; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text((d) => { return "($" + Math.round(this.medianPriceForYear(d)) + ")" });
  }

  medianPriceForYear(yearData) {
    let monthCount = 0;
    let total = 0;
    yearData.months.forEach((month, i) => {
      monthCount++;
      total += month.medianPrice;
    });

    return total / monthCount;
  }
}

let foo = new UnitedStatesHousePricingGraph();
