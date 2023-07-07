import { Pie } from 'react-chartjs-2'

interface ChartProps {
  backgroundColor: string;
  title: string;
  colors: string[];
  labels: string[];
  datas: number[];
}

const PieChart = (props: ChartProps) => {
  const data = {
    labels: props.labels,
    datasets: [
            {
                fill: true,
                backgroundColor: props.colors,
                data: props.datas,
                borderColor:	['transparent', 'transparent'],
                borderWidth: [2,2]
            }
    ]
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
      className="chart__container chart__container--pie"
      style={{ backgroundColor: props.backgroundColor }}
    >
      <Pie className="dashboard__chart dashboard__chart--pie" options={options} data={data} />
    </div>
  );
};

export default PieChart;