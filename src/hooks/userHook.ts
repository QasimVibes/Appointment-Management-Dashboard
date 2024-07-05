import { useAppDispatch, useAppSelector } from "./reduxHook";
import { getUser } from "@/store/slice/userSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export const useUser = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, isError } = useAppSelector((state) => state.user);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(getUser(session?.user?.id as string));
      } catch (error) {
        toast.error("Failed to fetch user");
      }
    };
    fetchUser();
  }, [dispatch, session?.user?.id]);

  return { user, isLoading, isError };
};
