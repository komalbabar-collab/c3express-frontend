import React from 'react';
import { Bar } from 'react-chartjs-2';


export default function BarChart({ data, isValue }) {
  // Extracting data for the chart
  const labels = data.map(item => isValue === "DailyPickupDetailsForAccounts" ? item.AllotedDate : item.TransDate);
  const deliveredShipments = data.map(item => isValue === "DailyPickupDetailsForAccounts" ? item.Completed : item.DeliverdShipments);
  const nonDelivered = data.map(item => isValue === "DailyPickupDetailsForAccounts" ? item.Pending : item.NonDelivered);
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: isValue === "DailyPickupDetailsForAccounts" ? "Completed" : 'Delivered Shipments',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
        data: deliveredShipments,
      },
      {
        label: isValue === "DailyPickupDetailsForAccounts" ? "Pending" : 'Non-Delivered Shipments',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
        hoverBorderColor: 'rgba(255, 99, 132, 1)',
        data: nonDelivered,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'category',
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Shipments Count',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };
  return (
    <div>
      <Bar data={chartData} options={chartOptions} width={500} height={300} />
    </div>
  );
}
