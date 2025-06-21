
import apiClient from '@/lib/api/client';
import { RegisterRequest, LoginRequest } from "@/types/api";


export async function register(registerData: RegisterRequest) {
  try {
    const response = await apiClient.post('/auth/register',  {
      body: registerData
    })
    return response.data;
  } catch (error) {
    console.error("Register failed :" + error);
    throw error;
  }
}

export async function login(loginData: LoginRequest) {
  try {
    const response = await apiClient.post('/auth/login', {
      body: loginData
    })
    return response.data
  } catch (error) {
    console.error("Login failed :" + error);
    throw error;
  }
}
