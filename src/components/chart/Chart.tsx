import dynamic from "next/dynamic";
import { useChart, useWeeklyCharts } from "./useChart";
import Loading from "../loading/Loading";
import Error from "../error/Error";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { AnalyticsData } from "@/types/types";
import { chartEventData } from "@/constants/ChartOptions";

const Analytics: React.FC = () => {
  const { isLoading, isError, analyticsData } = useChart();
  const { weeklyData, weeklyVisitsData, weeklyPeakHoursData } = useWeeklyCharts(
    {
      analyticsData: analyticsData as AnalyticsData[] | null,
    }
  );
  const chartData = chartEventData({
    weeklyData,
    weeklyVisitsData,
    weeklyPeakHoursData,
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className="space-y-[24px] py-6">
      {chartData?.map((chart, index) => (
        <div key={index}>
          <Chart
            options={chart?.options}
            series={[{ name: chart?.seriesName, data: chart?.data }]}
            type="bar"
            height={350}
            width="97%"
          />
        </div>
      ))}
    </div>
  );
};

export default Analytics;
