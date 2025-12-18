import apiClient from "./client";
import { AuthResponse } from "../types";

const MOCK_AUTH = import.meta.env.VITE_MOCK_AUTH === "true";

export const authApi = {
  verifyToken: async (tokenId: string): Promise<AuthResponse> => {
    // LOCAL DEV MODE (NO BACKEND AUTH)
    if (MOCK_AUTH) {
      console.warn(" MOCK AUTH ENABLED (Frontend only)");

      return {
        ok: true,
        token: "mock-token",
        user: {
          _id: "local-user-id",
          name: "Local Tester",
          phone: "99999999",
          email: "local@test.mn",
          company: "Toki",
          department: "IT",
          subDepartment: "Frontend",
          isTokiEmployee: true,
        },
      };
    }

    //  PRODUCTION / REAL AUTH
    return apiClient.post<AuthResponse>("/auth/verify", { tokenId });
  },
};

export default authApi;
