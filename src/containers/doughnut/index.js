import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Card } from '../../components/card';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = ({values}) => {
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
        <Card>
            <Doughnut data={data} className='pie-chart-component'/>
        </Card>
    )
}