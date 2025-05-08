import {useMutation} from "@tanstack/react-query";
import {LoginRequest} from "@/types/api";
import {login} from "@/services/api/auth";

export function useLogin() {
  return useMutation({
    mutationFn : (payload : LoginRequest) => login(payload),
  })
}