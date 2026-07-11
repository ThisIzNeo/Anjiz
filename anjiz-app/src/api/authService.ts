/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "./axiosInstance";

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await apiClient.get("/users");


    const user = response.data.find((u: any) => {
      const match =
        u.email === credentials.email && u.password === credentials.password;
      console.log(`Checking: ${u.email} vs ${credentials.email} -> ${match}`);
      return match;
    });

    if (user) {
      console.log("Login successful for:", user.username);
      return { token: "fake-jwt-token" };
    }

    console.warn("No user found matching these credentials.");
    throw new Error("Invalid credentials");
  },
};
