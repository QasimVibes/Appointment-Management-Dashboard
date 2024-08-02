import { useAppDispatch } from "@/hooks/reduxHook";
import { putPeakHoursAnalyticsData } from "@/store/slice/analyticsSlice";

export const useInvitationHandler = (
  meetingLink: string | null,
  userId: string | null,
  url: string | null
) => {
  const dispatch = useAppDispatch();

  const invitationHandler = () => {
    const meetingLinks = meetingLink as string;
    const newWindow = window.open(meetingLinks, "_blank");
    if (newWindow) {
      const start = new Date();
      const id = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(id);
          const end = new Date();
          const durationInSeconds = (end.getTime() - start.getTime()) / 1000;
          const durationInMinutes = Math.max(
            Math.ceil(durationInSeconds / 60),
            1
          );

          if (userId && url) {
            dispatch(
              putPeakHoursAnalyticsData({ userId, url, durationInMinutes })
            ).unwrap();
          }
        }
      }, 1000);
    }
  };

  return { invitationHandler };
};
