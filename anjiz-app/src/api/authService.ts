/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "./axiosInstance";

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await apiClient.get("/users");
    console.log("Data from server:", response.data);
    console.log("Attempting to match:", credentials);

    const user = response.data.find((u: any) => {
      console.log(`Checking: ${u.email} === ${credentials.email}`);
      return (
        u.email === credentials.email && u.password === credentials.password
      );
    });

    if (user) {
      return { token: "fake-jwt-token" };
    }
    throw new Error("Invalid credentials");
  },
};
