import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { fetchAnalyticsData } from "@/store/slice/analyticsSlice";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { AnalyticsData, UseWeeklyChartsProps } from "@/types/types";

export const useChart = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const dispatch = useAppDispatch();
  const { isLoading, isError, analyticsData } = useAppSelector(
    (state) => state.analytics
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchAnalyticsData(userId))
        .unwrap()
        .catch((error) => {
          console.error("Failed to fetch analytics data:", error);
        });
    }
  }, [userId, dispatch]);

  return { isLoading, isError, analyticsData };
};

const getWeekOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 1);
  const firstMonday =
    start.getDay() === 1
      ? start
      : new Date(
          start?.setDate(start?.getDate() + ((8 - start?.getDay()) % 7))
        );
  const diff =
    (date?.getTime() - firstMonday?.getTime()) / (1000 * 60 * 60 * 24);
  return Math.floor(diff / 7) + 1;
};

const transformDataToWeekly = (data: AnalyticsData[]) => {
  const weeksData = Array(7).fill(0);

  data.forEach((item) => {
    const itemDate = new Date(item?.date);
    const itemWeek = getWeekOfYear(itemDate);
    const currentWeek = getWeekOfYear(new Date());

    const weekDifference = itemWeek - currentWeek;
    const weekIndex =
      (weekDifference >= 0 ? weekDifference : 7 + weekDifference) % 7;

    if (weekIndex >= 0 && weekIndex < 7) {
      weeksData[weekIndex] += item.scheduledCount;
    }
  });

  return weeksData;
};

const transformVisitsToWeekly = (data: AnalyticsData[]) => {
  const weeksData = Array(7).fill(0);

  data.forEach((item) => {
    const itemDate = new Date(item.date);
    const itemWeek = getWeekOfYear(itemDate);
    const currentWeek = getWeekOfYear(new Date());

    const weekDifference = itemWeek - currentWeek;
    const weekIndex =
      (weekDifference >= 0 ? weekDifference : 7 + weekDifference) % 7;

    if (weekIndex >= 0 && weekIndex < 7) {
      weeksData[weekIndex] += item.visits;
    }
  });

  return weeksData;
};

const transformPeakHoursToWeekly = (data: AnalyticsData[]) => {
  const weeksData = Array(7).fill(0);

  data.forEach((item) => {
    const itemDate = new Date(item?.date);
    const itemWeek = getWeekOfYear(itemDate);
    const currentWeek = getWeekOfYear(new Date());

    const weekDifference = itemWeek - currentWeek;
    const weekIndex =
      (weekDifference >= 0 ? weekDifference : 7 + weekDifference) % 7;

    if (weekIndex >= 0 && weekIndex < 7) {
      item.peakHours?.forEach((hour) => {
        weeksData[weekIndex] += hour;
      });
    }
  });

  return weeksData;
};

export const useWeeklyCharts = ({ analyticsData }: UseWeeklyChartsProps) => {
  const [weeklyData, setWeeklyData] = useState<number[]>([]);
  const [weeklyVisitsData, setWeeklyVisitsData] = useState<number[]>([]);
  const [weeklyPeakHoursData, setWeeklyPeakHoursData] = useState<number[]>([]);

  useEffect(() => {
    if (analyticsData) {
      setWeeklyData(transformDataToWeekly(analyticsData));
      setWeeklyVisitsData(transformVisitsToWeekly(analyticsData));
      setWeeklyPeakHoursData(transformPeakHoursToWeekly(analyticsData));
    }
  }, [analyticsData]);

  return {
    weeklyData,
    weeklyVisitsData,
    weeklyPeakHoursData,
  };
};
