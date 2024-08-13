import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { loginSchema } from "@/constants/FormSchema";
import { z } from "zod";
import {
  clearLoginDetails,
  loginWithEmail,
  loginWithGoogle,
} from "@/store/slice/loginSlice";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { fetchAvailabilityData } from "@/store/slice/availabilitySlice";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { loginStatus, error, isLoadingwithemail, isLoadingwithgoogle } =
    useAppSelector((state) => state.login);

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
    try {
      loginSchema.parse(data);
      await dispatch(loginWithEmail(data)).unwrap();
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
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
      dispatch(clearLoginDetails());
    };
  }, [dispatch]);

  return {
    onChangeHandler,
    handleEmailSignIn,
    handleGoogleSignIn,
    data,
    isLoadingwithemail,
    isLoadingwithgoogle,
  };
};
