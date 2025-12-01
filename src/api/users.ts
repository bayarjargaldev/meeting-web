import apiClient from "./client";
import { UsersResponse, GroupsResponse, User } from "../types";

export const usersApi = {
  getUsers: async (): Promise<User[]> => {
    const res = await apiClient.get<UsersResponse>("/users");
    return res.users;
  },

  searchEmployees: async (query: string, group?: string): Promise<User[]> => {
    const res = await apiClient.get<UsersResponse>("/employees/search", {
      q: query,
      group,
    });
    return res.users;
  },

  getUsersByGroup: async (groupName: string): Promise<User[]> => {
    const res = await apiClient.get<UsersResponse>(`/users/group/${groupName}`);
    return res.users;
  },

  getGroups: async (): Promise<string[]> => {
    const res = await apiClient.get<GroupsResponse>("/users/groups");
    return res.groups;
  },

  getMe: async (): Promise<User> => {
    const res = await apiClient.get<{ user: User }>("/users/me");
    return res.user;
  },
};

export default usersApi;
