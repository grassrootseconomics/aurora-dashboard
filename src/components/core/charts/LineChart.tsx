import { Line } from 'react-chartjs-2';

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

const LineChart = (props: ChartProps) => {
  const data = {
    labels,
    datasets: props.datasets.map((dataset: Dataset) => {
      return {
        borderColor: dataset.color,
        label: dataset.label,
        data: dataset.datas,
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
    borderColor: '',
  };

  return (
    <div
      className="chart__container"
      style={{ backgroundColor: props.backgroundColor }}
    >
      <Line className="dashboard__chart" options={options} data={data} />
    </div>
  );
};

export default LineChart;
