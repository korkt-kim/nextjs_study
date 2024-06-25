import { getData, TimeSeries } from "@/apis/charts";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useMemo } from "react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { getLabels } from "../util";

export default function Rechart({
  chartData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const data = useMemo(() => {
    if (!chartData) {
      return [];
    }

    return getLabels(chartData).map((item) => {
      return {
        time: item,
        close: chartData[item]["4. close"],
      };
    });
  }, [chartData]);

  return (
    <>
      <div style={{ fontSize: "20px", textAlign: "center" }}>
        <p>Rechart Line Chart SSR</p>
      </div>
      <ResponsiveContainer width="100%" aspect={2.0 / 1.0}>
        <LineChart
          title="Rechart Line Chart SSR"
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <Line type="monotone" dataKey="close" stroke="#8884d8" />
          <XAxis dataKey="time" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export const getServerSideProps = (async () => {
  const data = await getData();

  return { props: { chartData: data["Time Series (5min)"] } };
}) satisfies GetServerSideProps<{ chartData: TimeSeries }>;
