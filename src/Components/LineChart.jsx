import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import data from '../Data/eve.json'; // Import your data

const LineChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Format the data for the chart
  const formattedData = data.filter(item => item.alert && item.alert.category)
    .map(item => ({
      timestamp: new Date(item.timestamp).toLocaleTimeString(),
      category: item.alert.category
    }));

  // Group the data by category
  const groupedData = formattedData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item.timestamp);
    return acc;
  }, {});

  // Get unique timestamps
  const uniqueTimestamps = [...new Set(formattedData.map(item => item.timestamp))];

  // Prepare data for the chart
  const datasets = Object.keys(groupedData).map(category => {
    const data = uniqueTimestamps.map(timestamp => {
      return groupedData[category].filter(time => time === timestamp).length;
    });
    return {
      label: category,
      data: data,
      fill: false,
      borderColor: getRandomColor(),
      tension: 0.1
    };
  });

  // Generate random color for each category
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Render line chart when component mounts or updates
  useEffect(() => {
    if (formattedData.length === 0) return;

    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: uniqueTimestamps,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Time'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Number of Alerts'
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          }
        }
      }
    });

  }, [formattedData]);

  return (
    <div className="w-[95%] h-[600px] bg-[#1c1b1b] m-[10px_80px_10px_30px] shadow-lg shadow-black rounded-[12px] max-lg:w-[95%] max-md:w-[90%] max-md:mt-[10px] max-md:pt-[20px] max-md:m-auto max-sm:h-[350px] max-xs:pt-[100px] max-xs:h-auto max-xs:w-[95%]">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default LineChart;
