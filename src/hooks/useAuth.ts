import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { routes } from "../constants/routes";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "./useNavigate";

export function useAuth() {
  const context = useContext(AuthContext);
  const { replace } = useNavigate();

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  const loginMutation = useMutation({
    mutationFn: context.loginContext,
    onSuccess: ({ data }) => {
      const role = data.user.role;

      if (role === "Client") replace(routes.CLIENT_DB);
      else if (role === "Account Specialist") replace(routes.AS_DB);
      else if (role === "Marketing") replace(routes.MARKETING_DB);
      else replace(routes.HOME);
    },
    onError: () => {
      replace(routes.UNAUTHORIZED);
    },
  });

  return {
    ...context,
    loginMutation,
  };
}
