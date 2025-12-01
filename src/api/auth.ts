import apiClient from "./client";
import { AuthResponse } from "../types";

export const authApi = {
  verifyToken: (tokenId: string): Promise<AuthResponse> =>
    apiClient.post<AuthResponse>("/auth/verify", { tokenId }),
};

export default authApi;
