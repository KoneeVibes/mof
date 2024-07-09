import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ChartsCardWrapper } from '../metricsarea/styled';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const BarChart = ({ axis, title, labels, values, label }) => {
    const options = {
        responsive: true,
        indexAxis: axis,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: title,
            },
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 8,
                        family: 'Arial, sans-serif',
                        color: '#00FF00' // Green color
                    }
                },
            },
            y: {
                ticks: {
                    font: {
                        size: 8,
                        family: 'Arial, sans-serif',
                        color: '#00FF00' // Green color
                    }
                },
            }
        }
    };

    const data = {
        labels,
        datasets: [
            {
                axis: axis,
                label: label,
                data: values,
                backgroundColor: '#059212',
            }
        ],
    };

    return (
        < ChartsCardWrapper
            className="card-component"
        >
            <Bar data={data} options={options} className='bar-chart-component' />
        </ChartsCardWrapper>
    )
}