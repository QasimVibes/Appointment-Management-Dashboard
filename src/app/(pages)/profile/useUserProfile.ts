import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/hooks/reduxHook";
import { AxiosInstance } from "@/utils/axiosInstance";
import { updateUser } from "@/store/slice/userSlice";
import { toast } from "react-hot-toast";

export const useUserProfile = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const username=session?.user?.username?.slice(0, 1).toUpperCase();
  const [data, setData] = useState<any>({
    fullname: "",
    welcomeMessage: "",
    language: "",
    dateFormat: "",
    timeFormat: "",
    country: "",
    timezone: "",
    userId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setData((prevData: any) => ({
      ...prevData,
      [name]: value,
      userId: session?.user?.id,
    }));
  };

  const saveChangesHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    await dispatch(updateUser(data));
  };

  const fetchDataHandler = async () => {
    try {
      const response = await AxiosInstance.get("/user", {
        params: { userId: session?.user?.id },
      });
      setData(response.data.user);
      toast.success("Data fetched successfully");
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchDataHandler();
    }
  }, [session?.user?.id]);

  return {username ,data, handleChange, saveChangesHandler };
};
