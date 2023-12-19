import { useToast } from "@chakra-ui/react";
import React from "react";

type toastProps = {
  title: string;
  description?: string;
  status: "info" | "warning" | "success" | "error" | "loading";
  toast: any;
};

function NotifToast({ title, description, status, toast }: toastProps) {
  return toast({
    position: "bottom-right",
    title: title,
    description: description,
    status: status,
    duration: 9000,
    isClosable: true,
  });
}

export default NotifToast;
