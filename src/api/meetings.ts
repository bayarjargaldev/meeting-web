import apiClient from "./client";
import { MeetingsResponse, Meeting, CalendarResponse } from "../types";

export const meetingsApi = {
  getMeetings: async (): Promise<Meeting[]> => {
    const res = await apiClient.get<MeetingsResponse>("/meetings");
    return res.meetings;
  },

  getHistory: async (): Promise<Meeting[]> => {
    const res = await apiClient.get<MeetingsResponse>("/meetings/history");
    return res.meetings;
  },

  getCalendar: async (
    date: string,
    view: "day" | "week" | "month" = "day",
  ): Promise<Meeting[]> => {
    const res = await apiClient.get<CalendarResponse>("/meetings/calendar", {
      date,
      view,
    });
    return res.meetings;
  },

  createMeeting: async (data: {
    title: string;
    description?: string;
    location?: string;
    participants: string[];
    start: string;
    end: string;
  }): Promise<Meeting> => {
    const res = await apiClient.post<{ ok: boolean; meeting: Meeting }>(
      "/meetings",
      data,
    );
    return res.meeting;
  },

  respondToMeeting: async (
    meetingId: string,
    response: "accepted" | "rejected",
  ): Promise<Meeting> => {
    const res = await apiClient.post<{ ok: boolean; meeting: Meeting }>(
      `/meetings/${meetingId}/respond`,
      { response },
    );
    return res.meeting;
  },

  cancelMeeting: async (meetingId: string): Promise<void> => {
    await apiClient.post(`/meetings/${meetingId}/cancel`);
  },
};

export default meetingsApi;
