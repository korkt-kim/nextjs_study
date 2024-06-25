export type TimeSeries = {
  [time: string]: Record<
    "1. open" | "2. high" | "3. low" | "4. close" | "5. volume",
    number
  >;
};

export const getData = async (): Promise<{
  "Meta Data": object;
  "Time Series (5min)": TimeSeries;
}> => {
  const res = await fetch(
    "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo"
  );
  if (!res.ok) {
    throw new Error("not ok response");
  }

  return await res.json();
};
