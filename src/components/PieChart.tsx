"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { memo } from "react";

const ReactApexCharts = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const state: ApexOptions = {
  colors: ["#1EB259", "#046EB6"],
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
    active: {
      filter: {
        type: "none",
      },
    },
  },
  chart: {
    type: "donut",
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  responsive: [
    {
      breakpoint: 2500, // 2xl
      options: {
        chart: {
          height: 310,
          width: 310,
        },
      },
    },
    {
      breakpoint: 1536, // 2xl
      options: {
        chart: {
          height: 300,
          width: 300,
        },
      },
    },
    {
      breakpoint: 1280, // xl
      options: {
        chart: {
          height: 300,
          width: 300,
        },
      },
    },
    {
      breakpoint: 1024, // lg
      options: {
        chart: {
          height: 300,
          width: 300,
        },
      },
    },
    {
      breakpoint: 768, // md
      options: {
        chart: {
          height: 280,
          width: 280,
        },
      },
    },
    {
      breakpoint: 640, // sm
      options: {
        chart: {
          height: 280,
          width: 280,
        },
      },
    },
    {
      breakpoint: 480, // xs
      options: {
        chart: {
          height: 280,
          width: 280,
        },
      },
    },
    {
      breakpoint: 320, // xxs (very small phones)
      options: {
        chart: {
          height: 280,
          width: 280,
        },
      },
    },
  ],
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          total: {
            show: true,
            showAlways: true,
            label: "EMI",
            fontSize: "30px",
            fontFamily: "Montserrat",
            fontWeight: 700,
            color: "#373d3f",
            formatter: function (w) {
              return "₹" + 0;
            },
          },
        },
      },
    },
  },
  tooltip: {
    enabled: true,
    fillSeriesColor: false,
    marker: {
      show: true,
    },
    theme: "dark",
    style: {
      fontSize: "14px",
      fontFamily: "Montserrat",
    },
    y: {
      formatter: function (val) {
        return `${val}%`;
      },
    },
  },
  labels: ["Principle Amount", "Interest Payable"],
};

const PieChart = ({ series }) => {
  state.series = series?.map((v) => Number(v));
  state.plotOptions = {
    pie: {
      donut: {
        labels: {
          show: false,
          total: {
            show: true,
            showAlways: true,
            label: "EMI",
            fontSize: "30px",
            fontWeight: 700,
            color: "#12284B",
            formatter: function (w) {
              return "₹" + "amount";
            },
          },
        },
      },
    },
  };

  return <ReactApexCharts options={state} series={state.series} type="donut" />;
};

export default memo(PieChart);
