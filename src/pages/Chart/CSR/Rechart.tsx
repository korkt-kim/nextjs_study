import { getData, TimeSeries } from "@/apis/charts";
import { useEffect, useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { getLabels } from "../util";

export default function Rechart() {
  const [rawData, setRawData] = useState<TimeSeries | null>(null);
  useEffect(() => {
    getData().then((res) => {
      setRawData(res["Time Series (5min)"]);
    });
  }, []);

  const data = useMemo(() => {
    if (!rawData) {
      return [];
    }

    return getLabels(rawData).map((item) => {
      return {
        time: item,
        close: rawData[item]["4. close"],
      };
    });
  }, [rawData]);

  return (
    <>
      <div style={{ fontSize: "20px", textAlign: "center" }}>
        <p>Rechart Line Chart CSR</p>
      </div>
      {rawData ? (
        <ResponsiveContainer width="100%" aspect={2.0 / 1.0}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <Line type="monotone" dataKey="close" stroke="#8884d8" />
            <XAxis dataKey="time" />
            <YAxis />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        "Loading"
      )}
    </>
  );
}
