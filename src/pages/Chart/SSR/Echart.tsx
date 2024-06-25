import { getData, TimeSeries } from "@/apis/charts";
import type { EChartsOption } from "echarts-for-react";
import ReactECharts from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  BrushComponent,
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getLabels, getValues } from "../util";
import { SVGRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  BrushComponent,
  LineChart,
  SVGRenderer,
]);

export default function Echart({
  chartData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const option: EChartsOption = {
    title: {
      left: "center",
      text: "Echart Line Chart SSR",
    },
    xAxis: {
      type: "category",
      data: !chartData ? [] : getLabels(chartData),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: !chartData ? [] : getValues(chartData),
        type: "line",
      },
    ],
  };

  return (
    <div style={{ height: "500px" }}>
      <ReactECharts
        style={{ height: "100%" }}
        opts={{ renderer: "svg" }}
        echarts={echarts}
        option={option}
      />
    </div>
  );
}

export const getServerSideProps = (async () => {
  const data = await getData();

  return { props: { chartData: data["Time Series (5min)"] } };
}) satisfies GetServerSideProps<{ chartData: TimeSeries }>;
