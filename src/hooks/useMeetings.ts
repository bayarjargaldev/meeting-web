import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { meetingsApi } from "../api/meetings";

export const QUERY_KEYS = {
  meetings: ["meetings"] as const,
  history: ["meetings", "history"] as const,
  calendar: (date: string) => ["meetings", "calendar", date] as const,
};

export const useMeetings = () =>
  useQuery({
    queryKey: QUERY_KEYS.meetings,
    queryFn: meetingsApi.getMeetings,
    staleTime: 1000 * 60 * 5,
  });

export const useMeetingHistory = () =>
  useQuery({
    queryKey: QUERY_KEYS.history,
    queryFn: meetingsApi.getHistory,
    staleTime: 1000 * 60 * 10,
  });

export const useCalendar = (date: string) =>
  useQuery({
    queryKey: QUERY_KEYS.calendar(date),
    queryFn: () => meetingsApi.getCalendar(date, "day"),
    staleTime: 1000 * 60 * 5,
  });

export const useRespondToMeeting = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      meetingId,
      response,
    }: {
      meetingId: string;
      response: "accepted" | "rejected";
    }) => meetingsApi.respondToMeeting(meetingId, response),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.meetings });
      window.alert("Response recorded!");
    },
    onError: (err: any) => {
      window.alert(err?.response?.data?.message || "Failed to respond");
    },
  });
};
