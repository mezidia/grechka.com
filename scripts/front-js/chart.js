'use strict';

function loadChart(xs, ys) {
  const ctx = document.getElementById('chart').getContext('2d');
  const chartWrapper = document.getElementById('main-graphic');
  ctx.width = chartWrapper.width;
  ctx.height = chartWrapper.height;
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xs,
      datasets: [{
        label: 'Мінімальна ціна гречки',
        fill: false,
        data: ys,
        backgroundColor: 'rgba(127, 255, 212, 1)',
        borderColor: 'rgba(0, 0, 0, 0.3)',
        borderWidth: 1
      }]
    },
  });
}
