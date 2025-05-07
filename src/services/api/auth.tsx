
import apiClient from '@/lib/api/client';
import { RegisterRequest } from "@/types/api";


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


