"use client";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import { useResetPassword } from "./useResetPassword";
import { inputFieldsResetPassword } from "@/constants/InputDetails";

export function ResetPassword() {
  const {
    handleResetPassword,
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
    isLoading,
  } = useResetPassword();
  const inputFields = inputFieldsResetPassword({
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
  });
  return (
    <div className="mt-5">
      <form onSubmit={handleResetPassword}>
        <div className="space-y-2">
          {inputFields?.map((field) => (
            <Input
              key={field?.id}
              type={field?.type}
              id={field?.id}
              label={field?.label}
              value={field?.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.setValue(e.target.value)
              }
              className="py-3 px-4 block w-full border-2 border-lightgray rounded-md text-sm focus:border-quaternary focus:ring-quaternary shadow-sm font-inter text-primary"
              labelClassName="text-sm font-bold"
            />
          ))}
        </div>

        <div className="mt-5">
          <Button
            text="Reset password"
            isLoading={isLoading}
            className="py-3 w-full px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent bg-quaternary text-white hover:bg-quaternary focus:outline-none focus:ring-2 focus:ring-quaternary focus:ring-offset-2 transition-all text-[16px] leading-[22px] font-[500]"
          />
        </div>
      </form>
    </div>
  );
}
