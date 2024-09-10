import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  // Generate dummy data for 52 weeks
  const salesData = Array.from(
    { length: 52 },
    () => Math.floor(Math.random() * 1000) + 200
  ); // Weekly sales between 200 and 1200 dollars

  // Labels for the weeks (1 to 52)
  const labels = Array.from({ length: 20 }, (_, i) => `Week ${i + 1}`);

  // Chart data and configuration
  const data = {
    labels,
    datasets: [
      {
        label: "Weekly Sales ($)",
        data: salesData,
        borderColor: "rgb(52, 112, 243)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.3, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weekly Sales Over 1 Year",
      },
    },
  };

  return (
    <div style={{ width: "90%", margin: "50px auto" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
