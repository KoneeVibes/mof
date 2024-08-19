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
import { ChartsCardWrapper } from '../../containers/dataoverviewarea/styled';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const BarChart = ({ axis, title, labels, datasets, barThickness }) => {
    const options = {
        responsive: true,
        indexAxis: axis,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 8,
                        family: 'Assistant',
                        weight: 700,
                        color: '#222539',
                    },
                },
            },
            title: {
                display: true,
                text: title,
                font: {
                    size: 12,
                    family: 'Assistant',
                    weight: 700,
                    color: '#222539',
                },
            },
        },
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 8,
                        family: 'Inter',
                        weight: 400,
                        color: '#00FF00'
                    }
                },
            },
            y: {
                stacked: true,
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 8,
                        family: 'Inter',
                        weight: 400,
                        color: '#00FF00'
                    }
                },
            }
        },
        datasets: {
            bar: {
                borderRadius: 1,
                barThickness: barThickness,
            },
        }
    };

    const data = {
        labels,
        datasets
    };

    return (
        <ChartsCardWrapper className="card-component">
            <Bar data={data} options={options} className='bar-chart-component' />
        </ChartsCardWrapper>
    );
};