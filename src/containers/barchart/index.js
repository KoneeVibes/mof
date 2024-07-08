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
import { Card } from '../../components/card';

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
        <Card>
            <Bar data={data} options={options} className='bar-chart-component'/>
        </Card>
    )
}