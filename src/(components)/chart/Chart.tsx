import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const Analytics: React.FC = () => {
  const visitData = {
    categories: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    series: [
      {
        name: "Visits",
        data: [120, 150, 200, 170, 140, 110, 180],
      },
    ],
  };

  const appointmentData = {
    categories: [
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
      "Week 5",
      "Week 6",
      "Week 7",
    ],
    series: [
      {
        name: "Scheduled Appointments",
        data: [30, 45, 60, 40, 50, 0, 40],
      },
    ],
  };

  const peakHoursData = {
    categories: [
      "0-1",
      "1-2",
      "2-3",
      "3-4",
      "4-5",
      "5-6",
      "6-7",
      "7-8",
      "8-9",
      "9-10",
    ],
    series: [
      {
        name: "Peak Hours",
        data: [10, 20, 15, 25, 30, 40, 35, 50, 45, 30],
      },
    ],
  };

  const visitsOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    title: {
      text: "Number of Visits to Appointment Page",
    },
    xaxis: {
      categories: visitData.categories,
    },
    yaxis: {
      title: {
        text: "Number of Visits",
      },
    },
    colors: ["#00E396"],
  };

  const appointmentsOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    title: {
      text: "Scheduled Appointments per Week",
    },
    xaxis: {
      categories: appointmentData.categories,
    },
    yaxis: {
      title: {
        text: "Number of Appointments",
      },
    },
    colors: ["#FF4560"],
  };

  const peakHoursOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    title: {
      text: "Peak Hours for Appointments",
    },
    xaxis: {
      categories: peakHoursData.categories,
    },
    yaxis: {
      title: {
        text: "Number of Appointments",
      },
    },
    colors: ["#0099FF"],
  };

  return (
    <div className="space-y-[24px] py-6">
      <div className="">
        <Chart
          options={visitsOptions}
          series={visitData.series}
          type="bar"
          height={350}
          width="97%"
        />
      </div>
      <div className="">
        <Chart
          options={appointmentsOptions}
          series={appointmentData.series}
          type="bar"
          height={350}
           width="97%"
        />
      </div>
      <div className="">
        <Chart
          options={peakHoursOptions}
          series={peakHoursData.series}
          type="bar"
          height={350}
           width="97%"
        />
      </div>
    </div>
  );
};

export default Analytics;
