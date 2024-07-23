import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ChartsCardWrapper } from '../../containers/metricsarea/styled';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = ({ title, labels, label, values, bgColor, borderColor, radius, maxHeight }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,
            },
        },
        datasets: {
            doughnut: {
                cutout: "50%",
                radius: radius,
            },
        }
    };

    const data = {
        labels: labels,
        datasets: [
            {
                label: label,
                data: values,
                backgroundColor: bgColor,
                borderColor: borderColor,
                borderWidth: 1,
            },
        ],
    };
    return (
        <ChartsCardWrapper
            className="card-component"
        >
            <Doughnut data={data} options={options} style={{ maxHeight: maxHeight }} className='pie-chart-component' />
        </ChartsCardWrapper>
    )
}