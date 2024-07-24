import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartsCardWrapper } from "../../containers/metricsarea/styled";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const LineGraph = ({ title, labels, values }) => {
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
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Disbursement Requests",
                data: values,
                borderColor: '#059212',
                backgroundColor: '#059212',
            },
        ],
    };
    return (
        <ChartsCardWrapper
            className="card-component"
        >
            <Line data={data} options={options} className="line-graph-component" />
        </ChartsCardWrapper>
    )
}