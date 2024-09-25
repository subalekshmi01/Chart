// ChartComponent.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';  // Correctly import this

// Register the required Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels  // Register ChartDataLabels plugin
);

const Chart= () => {
    const names = [
        'John', 'Sara', 'Mark', 'Tom', 'Lucy', 'Anna', 'Peter', 'Sophia',
        'Henry', 'Jane', 'Paul', 'Sam', 'Emily', 'James', 'Laura', 'Nick',
        'Chloe', 'David', 'Emma', 'George'
    ];

    const marks = [85, 92, 78, 88, 75, 90, 95, 82, 68, 80, 88, 93, 77, 84, 91, 73, 76, 94, 81, 87];

    // Map marks to emojis (😊 for high marks, 😐 for average, 😢 for low)
    const emojiMarks = marks.map(mark => {
        if (mark >= 90) {
            return '😊'; // High mark
        } else if (mark >= 75) {
            return '😐'; // Average mark
        } else {
            return '😢'; // Low mark
        }
    });

    // Chart.js data structure
    const data = {
        labels: names,
        datasets: [
            {
                label: 'Marks',
                data: marks,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }
        ],
    };

    // Chart.js options
    const options = {
        scales: {
            y: {
                beginAtZero: true,
            }
        },
        plugins: {
            datalabels: {
                // Display emojis inside bars
                formatter: function(value, context) {
                    return emojiMarks[context.dataIndex]; // Display emoji for each bar
                },
                font: {
                    size: 20,
                },
                align: 'end',
                anchor: 'end'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `Mark: ${context.raw} ${emojiMarks[context.dataIndex]}`;
                    }
                }
            }
        }
    };

    return (
        <div>
            <h2>Student Marks with Emojis Inside Bars</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default Chart;
