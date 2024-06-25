import { getData, TimeSeries } from "@/apis/charts";
import { useEffect, useState } from "react";
import type { EChartsOption } from "echarts-for-react";
import ReactECharts from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import {
  TitleComponent,
  BrushComponent,
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { getLabels, getValues } from "../util";

echarts.use([
  TitleComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  BrushComponent,
  LineChart,
  SVGRenderer,
]);

export default function Echart() {
  const [rawData, setRawData] = useState<TimeSeries | null>(null);
  useEffect(() => {
    getData().then((res) => {
      setRawData(res["Time Series (5min)"]);
    });
  }, []);

  const option: EChartsOption = {
    title: {
      left: "center",
      text: "Echart Line Chart CSR",
    },
    xAxis: {
      type: "category",
      data: !rawData ? [] : getLabels(rawData),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: !rawData ? [] : getValues(rawData),
        type: "line",
      },
    ],
  };

  return (
    <div style={{ height: "500px" }}>
      {rawData ? (
        <ReactECharts
          style={{ height: "100%" }}
          opts={{ renderer: "svg" }}
          echarts={echarts}
          option={option}
        />
      ) : (
        "Loading"
      )}
    </div>
  );
}
