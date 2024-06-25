import { TimeSeries } from "@/apis/charts";

export const getLabels = (timeSeriesData: TimeSeries): string[] => {
  return Object.keys(timeSeriesData);
};

export const getValues = (timeSeriesData: TimeSeries): number[] => {
  return Object.values(timeSeriesData).reduce<number[]>((acc, item) => {
    return [...acc, item["4. close"]];
  }, [] as number[]);
};
