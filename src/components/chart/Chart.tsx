import dynamic from "next/dynamic";
import { useChart, useWeeklyCharts } from "./useChart";
import Loading from "../loading/Loading";
import Error from "../error/Error";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { AnalyticsData } from "@/types/types";
import {
  visitsOptions,
  appointmentsOptions,
  peakHoursOptions,
} from "@/constants/ChartOptions";

const Analytics: React.FC = () => {
  const { isLoading, isError, analyticsData } = useChart();

  const { weeklyData, weeklyVisitsData, weeklyPeakHoursData } = useWeeklyCharts(
    {
      analyticsData: analyticsData as AnalyticsData[] | null,
    }
  );

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <div className="space-y-[24px] py-6">
      <div>
        <Chart
          options={visitsOptions}
          series={[{ name: "Number of Visits", data: weeklyVisitsData }]}
          type="bar"
          height={350}
          width="97%"
        />
      </div>
      <div>
        <Chart
          options={appointmentsOptions}
          series={[{ name: "Scheduled Appointments", data: weeklyData }]}
          type="bar"
          height={350}
          width="97%"
        />
      </div>
      <div>
        <Chart
          options={peakHoursOptions}
          series={[{ name: "Peak Hours", data: weeklyPeakHoursData }]}
          type="bar"
          height={350}
          width="97%"
        />
      </div>
    </div>
  );
};

export default Analytics;
