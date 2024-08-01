import { useCallback } from "react";

export const useDropdownNavigation = () => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      if (value === "dashboard") {
        window.location.href = "/";
      } else if (value === "profile") {
        window.location.href = "/profile";
      }
    },
    []
  );

  return handleChange;
};
