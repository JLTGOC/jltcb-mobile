import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  const loginMutation = useMutation({
    mutationFn: context.loginContext,
  });

  return {
    ...context,
    loginMutation,
  };
}
