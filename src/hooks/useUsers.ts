import { useQuery } from "@tanstack/react-query";
import { usersApi } from "../api/users";

export const useSearchEmployees = (query: string, group?: string) =>
  useQuery({
    queryKey: ["employees", "search", query, group],
    queryFn: () => usersApi.searchEmployees(query, group),
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 5,
  });

export const useGroups = () =>
  useQuery({
    queryKey: ["groups"],
    queryFn: usersApi.getGroups,
    staleTime: 1000 * 60 * 30,
  });

export const useCurrentUser = () =>
  useQuery({
    queryKey: ["user", "me"],
    queryFn: usersApi.getMe,
    staleTime: 1000 * 60 * 10,
  });
