import React from "react";
import ReactApexChart from "react-apexcharts";

export default function TeamMemberStatus({ dataSeries = [], dataLabels = [] }) {
  const options = {
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          fill: {
            colors: ["#F44336", "#E91E63", "#9C27B0"],
          },
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
            },
          },
        },

        expandOnClick: false,
      },
    },
    labels: dataLabels,
  };

  return (
    <ReactApexChart
      options={options}
      series={dataSeries}
      //labels={labels}
      type="donut"
    />
  );
}
