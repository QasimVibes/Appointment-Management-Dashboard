import { useCallback } from "react";
import { toast } from "react-hot-toast";

export const useCopyLink = (url?: string) => {
  const handleCopyLink = useCallback(() => {
    if (typeof window !== "undefined") {
      const linkToCopy = `${window.location.origin}/scheduled/${url}`;
      navigator.clipboard.writeText(linkToCopy).then(
        () => {
          toast.success("Link copied to clipboard!");
        },
        (err) => {
          toast.error("Failed to copy the link.");
          console.error("Failed to copy: ", err);
        }
      );
    } else {
      console.error("Window object is not defined.");
    }
  }, [url]);

  return handleCopyLink;
};
