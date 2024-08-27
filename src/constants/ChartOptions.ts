import { ApexOptions } from "apexcharts";
import { Colors } from "./Colors";
import { ChartEventData } from "@/types/types";

const weekLabels = Array.from({ length: 7 }, (_, i) => `Week ${i + 1}`);

export const visitsOptions: ApexOptions = {
  chart: {
    type: "bar",
    height: 350,
  },
  title: {
    text: "Number of Visits to Appointment Page per Week",
  },
  xaxis: {
    categories: weekLabels,
  },
  yaxis: {
    title: {
      text: "Number of Visits",
    },
  },
  colors: [Colors.greenShade],
};

export const appointmentsOptions: ApexOptions = {
  chart: {
    type: "bar",
    height: 350,
  },
  title: {
    text: "Scheduled Appointments per Week",
  },
  xaxis: {
    categories: weekLabels,
  },
  yaxis: {
    title: {
      text: "Number of Appointments",
    },
  },
  colors: [Colors.pinkShade],
};

export const peakHoursOptions: ApexOptions = {
  chart: {
    type: "bar",
    height: 350,
  },
  title: {
    text: "Peak Hours for Appointments",
  },
  xaxis: {
    categories: weekLabels,
  },
  yaxis: {
    title: {
      text: "Number of Appointments",
    },
  },
  colors: [Colors.blueShade],
};

export const chartEventData = ({
  weeklyVisitsData,
  weeklyData,
  weeklyPeakHoursData,
}: ChartEventData) => {
  const chartData = [
    {
      options: visitsOptions,
      seriesName: "Number of Visits",
      data: weeklyVisitsData,
    },
    {
      options: appointmentsOptions,
      seriesName: "Scheduled Appointments",
      data: weeklyData,
    },
    {
      options: peakHoursOptions,
      seriesName: "Peak Hours",
      data: weeklyPeakHoursData,
    },
  ];

  return chartData;
};
