import { Bar } from 'react-chartjs-2';

import { Dataset } from '@/util/models/Dataset';

interface ChartProps {
  backgroundColor: string;
  title: string;
  datasets: Dataset[];
}

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const BarChart = (props: ChartProps) => {
  const data = {
    labels,
    datasets: props.datasets.map((dataset: Dataset) => {
      return {
        label: dataset.label,
        data: dataset.datas,
        backgroundColor: dataset.color,
      };
    }),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: props.title,
      },
    },
  };

  return (
    <div
      className="chart__container"
      style={{ backgroundColor: props.backgroundColor }}
    >
      <Bar className="dashboard__chart" options={options} data={data} />
    </div>
  );
};

export default BarChart;
