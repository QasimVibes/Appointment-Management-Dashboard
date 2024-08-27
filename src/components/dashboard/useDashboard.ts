import { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/hooks/reduxHook";
import { fetchAvailabilityData } from "@/store/slice/availabilitySlice";
import { useRouter } from "next/navigation";

export const useDashboard = () => {
  const { data: session } = useSession();
  const userName =
    session?.user?.username?.slice(0, 1).toUpperCase() ||
    session?.user?.name?.slice(0, 1).toUpperCase();

  const [activeTab, setActiveTab] = useState("Upcoming");
  const menuItems = [{ text: "Settings", link: "/profile" }];

  const [dashboardActiveTab, setDashboardActiveTab] = useState<
    "ScheduledEvents" | "Analytics"
  >("ScheduledEvents");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return {
    activeTab,
    setActiveTab,
    menuItems,
    dashboardActiveTab,
    setDashboardActiveTab,
    isSidebarOpen,
    setIsSidebarOpen,
    userName,
  };
};

export const useNavigateHandler = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const dispatch = useAppDispatch();
  let [onNavigate, setOnNavigate] = useState(false);

  const handleNavigate = useCallback(() => {
    if (userId) {
      setOnNavigate(true);
      dispatch(fetchAvailabilityData(userId))
        .unwrap()
        .then((data) => {
          const redirectTo =
            data && Object.keys(data).length > 0
              ? "/eventBooking"
              : "/availability";
          router.push(redirectTo);
        })
        .catch(() => {
          setOnNavigate(false);
          router.push("/availability");
        });
    }
  }, [userId, dispatch, router]);

  return { handleNavigate, onNavigate };
};
