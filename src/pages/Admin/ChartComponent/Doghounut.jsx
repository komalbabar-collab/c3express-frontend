import React from "react";
import Chart from "chart.js/auto";
import { Doughnut } from 'react-chartjs-2';
const DoughnutChart = (props) => {
  // Sample data for the chart
  const data = {
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        backgroundColor: ['#36A2EB', '#FFCE56', '#008000'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#007000'],
      },
    ],
  };
  return (
    <div>
      <Doughnut data={data} />
    </div>
  )
};
export default DoughnutChart;