import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { updateUser, getUserDetails } from "@/store/slice/userSlice";
import { UserData } from "@/types/types";
import {
  profilePerson,
  star,
  link,
  preferences,
  settingIcon,
  calender,
  helpIcon,
  logoutIcon,
} from "../../../public";

export const useUserProfile = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const userName =
    session?.user?.username?.charAt(0)?.toUpperCase() ||
    session?.user?.name?.charAt(0)?.toUpperCase() ||
    "";

  const [data, setData] = useState<UserData>({
    fullname: "",
    welcomeMessage: "",
    language: "",
    dateFormat: "",
    timeFormat: "",
    country: "",
    timezone: "",
    id: "",
  });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setEditMode(true);
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveChangesHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(updateUser(data)).unwrap();
    setEditMode(false);
  };

  const { isLoading, isError } = useAppSelector((state) => state.user);

  const fetchDataHandler = useCallback(async () => {
    if (userId) {
      const response = await dispatch(getUserDetails(userId)).unwrap();
      setData(response);
    }
  }, [userId, dispatch]);

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  const currentTime = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return {
    userName,
    data,
    handleChange,
    saveChangesHandler,
    currentTime,
    editMode,
    isLoading,
    isError,
  };
};

export const useSidebarandSelectOptions = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const menuItems = [{ text: "Dashboard", link: "/" }];

  const aboveItems = [
    { src: profilePerson, alt: "profilePerson", text: "Profile" },
    { src: star, alt: "star", text: "Branding" },
    { src: link, alt: "link", text: "My Link" },
    { src: preferences, alt: "preferences", text: "Login Preferences" },
    { src: settingIcon, alt: "settingIcon", text: "Cookie Settings" },
    { src: calender, alt: "calender", text: "Calender sync" },
  ];

  const belowItems = [
    { src: helpIcon, alt: "helpIcon", text: "Help" },
    { src: logoutIcon, alt: "logoutIcon", text: "Logout" },
  ];
  const languageOptions = ["English", "Urdu", "Hindi", "French"];
  const dateFormatOptions = ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY/MM/DD"];
  const timeFormatOptions = ["12h (am/pm)", "24h (am/pm)"];
  const countryOptions = [
    "Pakistan",
    "India",
    "Afghanistan",
    "Albania",
    "Algeria",
  ];
  const timezoneOptions = [
    "Pakistan, Maldives Time",
    "India Standard Time",
    "Afghanistan Standard Time",
    "Albania Standard Time",
    "Algeria Standard Time",
  ];

  const mapOptions = (options: string[]) => {
    return options.map((option) => ({
      value: option,
      label: option,
    }));
  };

  const languageItems = mapOptions(languageOptions);
  const dateFormatItems = mapOptions(dateFormatOptions);
  const timeFormatItems = mapOptions(timeFormatOptions);
  const countryItems = mapOptions(countryOptions);
  const timezoneItems = mapOptions(timezoneOptions);

  return {
    isSidebarOpen,
    toggleSidebar,
    menuItems,
    aboveItems,
    belowItems,
    languageItems,
    dateFormatItems,
    timeFormatItems,
    countryItems,
    timezoneItems,
  };
};
