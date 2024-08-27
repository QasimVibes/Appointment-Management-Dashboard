import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearDetails, signupUser } from "@/store/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { SignupProps } from "@/types/types";
import { validateSignupData } from "@/constants/FormSchema";
import toast from "react-hot-toast";

export const useSignup = () => {
  const dispatch = useAppDispatch();
  const signupState = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [data, setData] = useState<SignupProps>({
    email: "",
    fullname: "",
    username: "",
    password: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateSignupData(data);
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((message) => toast.error(message));
      return;
    }

    try {
      await dispatch(signupUser(data)).unwrap();
      router.push("/login");
    } catch (error) {
      toast.error("An error occurred during sign-up.");
    }
  };

  useEffect(() => {
    dispatch(clearDetails());
  }, [dispatch]);

  return {
    onChangeHandler,
    onHandleSubmit,
    signupState,
    data,
  };
};
