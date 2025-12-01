import apiClient from "./client";
import { AvailabilityResponse, ConflictCheck } from "../types";

export const availabilityApi = {
  getDayAvailability: (date: string, group?: string) =>
    apiClient.get<AvailabilityResponse>("/availability/day", { date, group }),

  checkAvailability: (
    userIds: string[],
    start: string,
    end: string,
  ): Promise<ConflictCheck> =>
    apiClient.get<ConflictCheck>("/availability/check", {
      userIds: userIds.join(","),
      start,
      end,
    }),
};

export default availabilityApi;
