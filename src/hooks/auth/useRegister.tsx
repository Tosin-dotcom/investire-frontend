import { useMutation } from '@tanstack/react-query';
import { register } from "@/services/api/auth";
import {RegisterRequest} from "@/types/api";


export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterRequest) => register(payload),
  });
}
