import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import data from "../Data/eve.json"
const BarChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Render bar chart when data changes
  useEffect(() => {
    if (data.length === 0) return;

    // Count occurrences of each destination port
    const portCounts = data.reduce((counts, item) => {
      const port = item.dest_port;
      if (port !== undefined) {
        counts[port] = (counts[port] || 0) + 1;
      }
      return counts;
    }, {});

    // Sort destination ports by count in descending order
    const sortedPorts = Object.entries(portCounts).sort((a, b) => b[1] - a[1]);

    // Extract top 10 ports for chart
    const topPorts = sortedPorts.slice(0, 10);
    const labels = topPorts.map(([port]) => port);
    const counts = topPorts.map(([_, count]) => count);

    // Clear previous chart
    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    // Render bar chart using Chart.js
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Destination Port Distribution',
          data: counts,
          backgroundColor: 'purple',
          borderColor: 'purple',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

  }, [data]);

  return (
    <div className='w-[48%] max-md:mr-[20px] max-md:w-[100%] max-lg:w-[80%] max-lg:mr-[10px]  p-[30px] h-[300px] font-montserrat bg-[#1c1b1b] rounded-[12px] shadow-lg shadow-black'>
      <h2 className='font-montserrat'>Destination Port Distribution</h2>
      <canvas ref={chartRef} width="400" height="300"></canvas>
    </div>
  );
};

export default BarChart;
