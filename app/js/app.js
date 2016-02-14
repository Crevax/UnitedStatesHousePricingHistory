var medianPriceForYear = function(yearData) {
  var monthCount = 0;
  var total = 0;
  yearData.months.forEach(function(month, i) {
    monthCount++;
    total += month.medianPrice;
  });

  return total / monthCount;
}

var data = priceHistory.years;

var barHeight = 20;

var max = d3.max(data, function(d) { return medianPriceForYear(d); });

var x = d3.scale.linear()
  .domain([0, max])
  .range([0, max]);

var chart = d3.select(".price-chart")
  .attr("width", x(max) / 300 + 180)
  .attr("height", barHeight * data.length);

var bar = chart.selectAll("g")
  .data(data)
  .enter().append("g")
  .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

bar.append("rect")
  .attr("width", function(d){ return x(medianPriceForYear(d)) / 300; })
  .attr("height", barHeight - 1);

bar.append("text")
  .attr("x", function(d) { return x(medianPriceForYear(d)) / 300 + 10; })
  .attr("y", barHeight / 2)
  .attr("dy", ".35em")
  .text(function(d) { return "" + d.year });

bar.append("text")
  .attr("x", function(d) { return x(medianPriceForYear(d)) / 300 + 100; })
  .attr("y", barHeight / 2)
  .attr("dy", ".35em")
  .text(function(d) { return "($" + Math.round(medianPriceForYear(d)) + ")" });