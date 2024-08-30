import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { validateLoginData } from "@/constants/FormSchema";
import {
  clearDetails,
  loginWithEmail,
  loginWithGoogle,
} from "@/store/slice/authSlice";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { fetchAvailabilityData } from "@/store/slice/availabilitySlice";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { loginStatus, error, isLoadingWithEmail, isLoadingWithGoogle } =
    useAppSelector((state) => state.auth);

  const [data, setData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    []
  );

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateLoginData(data);
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((message) => toast.error(message));
      return;
    }
    try {
      await dispatch(loginWithEmail(data)).unwrap();
    } catch (error: any) {
      if (error.message) {
        toast.error(error?.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    await dispatch(loginWithGoogle()).unwrap();
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchAvailabilityData(userId))
        .unwrap()
        .then((data) => {
          if (data && Object.keys(data).length > 0) {
            router.push("/");
          } else {
            router.push("/availability");
          }
        })
        .catch(() => {
          router.push("/availability");
        });
    }
  }, [userId, dispatch, router]);

  useEffect(() => {
    if (loginStatus === "succeeded") {
      toast.success("Logged in successfully");
    } else if (loginStatus === "failed") {
      toast.error(error || "Login failed");
    }
  }, [loginStatus, error, router]);

  useEffect(() => {
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch]);

  return {
    onChangeHandler,
    handleEmailSignIn,
    handleGoogleSignIn,
    data,
    isLoadingWithEmail,
    isLoadingWithGoogle,
  };
};
