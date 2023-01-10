import React from 'react';
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale, CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from 'chart.js';
import { Bar, Doughnut, PolarArea, Chart } from 'react-chartjs-2';
// import faker from 'faker';
import { utilService } from '../services/util.service';


ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend);


export function Dashboard() {
    const data = {
        labels: ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"],
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: 'Number of toys',
                data: [12, 19, 3, 5, 2, 3, 5, 15],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Price by type',
                // text: 'Percentage of toys in stock by type',
            },
        },
    };

    const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"];

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Price per toy type',
                // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                data: labels.map(() => utilService.getRandomIntInclusive(0, 200)),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', margin: '40px' }}>My dashboard</h1>
            <div style={{ display: 'flex', margin: '20px 50px' }}>
                <div style={{ width: '50%' }}>
                    <Doughnut data={data} />
                </div>
                <div style={{ width: '50%' }}>
                    <Bar options={options} data={chartData} />;
                </div>
            </div>
        </div>
    )
}
