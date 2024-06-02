import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import data from "../Data/eve.json";
import PieChart from "../Components/PieChart"
import LineChart from './LineChart';
const Charts = () => {
    const chartRef = useRef(null);

    // Filter and format data
    const formattedData = data.filter(item => item.alert && item.alert.severity !== undefined)
        .map(item => ({
            timestamp: new Date(item.timestamp).toLocaleTimeString(),
            severity: item.alert.severity,
            category: item.alert.category,
            src_ip: item.src_ip,
            dest_port: item.dest_port
        }));

    // Render chart when data changes
    useEffect(() => {
        if (formattedData.length === 0) return;

        // Prepare data for the chart
        const categoryCounts = {};
        formattedData.forEach((item) => {
            const category = item.category;
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });

        // Destroy previous chart instance if it exists
        if (chartRef.current !== null && chartRef.current !== undefined) {
            chartRef.current.destroy();
        }

        // Render bar chart using Chart.js with dark theme
        const ctx = document.getElementById('myChart');
        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(categoryCounts),
                datasets: [{
                    label: 'Event Count per Category',
                    data: Object.values(categoryCounts),
                    backgroundColor: 'purple',
                    borderColor: 'purple',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Count',
                            color:'purple'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Category',
                            color:'purple'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'white' 
                        }
                    }
                },
                layout: {
                    padding: {
                        top: 20,
                        bottom: 20
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Set tooltip background color to black
                        titleColor: 'white', // Set tooltip title color to white
                        bodyColor: 'white', // Set tooltip body text color to white
                        displayColors: false // Hide color box in tooltip,
                        ,color:'white'
                    }
                }
            }
        });
    }, [formattedData]);

    return (
        <>
        <div className='flex  max-md:justify-center max-md:m-auto max-md:item-center max-md:content-center max-md:p-[10px_0px] max-md:flex-col flex-row gap-3 max-sm:w-[100%] max-lg:w-[80%] max-md:w-[80%] max-xs:p-[20px_20px] p-[20px_40px] text-white'>
            <div className='max-xs:h-[250px]  max-lg:w-[80%] max-md:w-[100%]  h-[300px] bg-[#1c1b1b] w-[50%] rounded-[12px] shadow-lg shadow-black'>
                {/* <h1 className='text-center font-mono text-white'>Dashboard</h1> */}
                <canvas id="myChart"></canvas>

            </div>
                <PieChart></PieChart>
        </div>
        
                <LineChart/>
        
        </>
    );
};

export default Charts;
