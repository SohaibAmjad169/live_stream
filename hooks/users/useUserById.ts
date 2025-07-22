// src/hooks/users/useUserById.ts
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { BASE_URL, ApiUser } from "../../lib/userAPITypes";

const fetchUserByIdApi = async (userId: string): Promise<ApiUser> => {
  const authToken = Cookies.get("authToken");
  if (!authToken) {
    throw new Error("Authentication token not found. Please log in.");
  }

  const url = `${BASE_URL}/api/super-admin/user/${userId}`;
  // If your API uses a query parameter like ?user_id=... as shown in screenshot, change to:
  // const url = `${BASE_URL}/api/super-admin/user?user_id=${userId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Unknown error" }));
    throw new Error(
      errorData.message || `Failed to fetch user details: ${response.status}`
    );
  }
  console.log("Fetched user data:", await response.json());
  return response.json();
};

export const useUserById = (userId: string | null) => {
  console.log("useUserById called with userId:", userId);
  return useQuery<ApiUser, Error>({
    queryKey: ["user", userId],
    queryFn: () => fetchUserByIdApi(userId as string),
    enabled: !!userId,
  });
};
