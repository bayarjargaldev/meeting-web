import { useState } from "react";
import apiClient from "../api/client";

interface SearchUsersResponse {
  users: any[];
}

export function useUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const searchUsers = async (q: string) => {
    if (!q || q.length < 2) {
      setUsers([]);
      return;
    }

    try {
      setLoading(true);
      const res = await apiClient.get<SearchUsersResponse>("/users/search", {
        q,
      });

      setUsers(res.users);
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, searchUsers };
}

export default useUsers;
