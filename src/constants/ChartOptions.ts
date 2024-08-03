import { ApexOptions } from "apexcharts";
import { Colors } from "./Colors";

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
