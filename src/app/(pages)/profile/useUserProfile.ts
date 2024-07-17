import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { updateUser, getUserDetails } from "@/store/slice/userSlice";
import { UserData } from "@/types/types";

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
