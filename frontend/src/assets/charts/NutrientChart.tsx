import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions, TooltipItem } from 'chart.js';
import { NutrientValues } from '../../contexts/NutritionAnalysisContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface NutrientChartProps {
  nutrients: NutrientValues;
}

const NutrientChart: React.FC<NutrientChartProps> = ({ nutrients }) => {
  const labels = Object.keys(nutrients);
  const values = labels.map(label => nutrients[label].value);
  const units = labels.map(label => nutrients[label].unit);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Nutrient Value',
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, 
      },
      title: {
        display: true,
        text: 'Nutrient Values',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<'bar'>) {
            return `${tooltipItem.label}: ${tooltipItem.raw} ${units[tooltipItem.dataIndex]}`;
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default NutrientChart;
