import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ChartsCardWrapper } from '../metricsarea/styled';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = ({ values }) => {
    const data = {
        labels: ['Completed', 'Not Completed'],
        datasets: [
            {
                label: '% of Completion',
                data: values,
                backgroundColor: [
                    '#059212',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    '059212',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <ChartsCardWrapper
            className="card-component"
        >
            <Doughnut data={data} className='pie-chart-component' />
        </ChartsCardWrapper>
    )
}