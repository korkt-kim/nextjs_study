//SSR 과 CSR의 성능차이를 알아보기위함
import { getData, TimeSeries } from "@/apis/charts";
import { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { getLabels, getValues } from "../util";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart CSR",
    },
  },
};

export default function Chartjs() {
  const [rawData, setRawData] = useState<TimeSeries | null>(null);
  useEffect(() => {
    getData().then((res) => {
      setRawData(res["Time Series (5min)"]);
    });
  }, []);

  const data = useMemo(() => {
    return {
      labels: !rawData ? [] : getLabels(rawData),
      datasets: [
        {
          label: "close",
          data: !rawData ? [] : getValues(rawData),
          borderColor: "red",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
  }, [rawData]);

  if (!rawData) {
    return <p>Loading</p>;
  }

  return <Line data={data} options={options} />;
}
