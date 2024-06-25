//SSR 과 CSR의 성능차이를 알아보기위함
import { getData, TimeSeries } from "@/apis/charts";
import { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { getLabels, getValues } from "../util";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart SSR",
    },
  },
};

export default function Chartjs({
  chartData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const data = useMemo(() => {
    return {
      labels: getLabels(chartData),
      datasets: [
        {
          label: "close",
          data: getValues(chartData),
          borderColor: "red",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
  }, [chartData]);

  return <Line data={data} options={options} />;
}

export const getServerSideProps = (async () => {
  const data = await getData();

  return { props: { chartData: data["Time Series (5min)"] } };
}) satisfies GetServerSideProps<{ chartData: TimeSeries }>;
