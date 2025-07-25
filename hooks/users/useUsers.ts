import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {
  BASE_URL,
  ApiUser,
  FetchUsersResponse,
  FetchUsersParams,
} from "../../lib/userAPITypes";

export const fetchUsersApi = async (
  params: FetchUsersParams
): Promise<FetchUsersResponse> => {
  const authToken = Cookies.get("authToken");
  if (!authToken) {
    throw new Error("Authentication token not found. Please log in.");
  }

  const queryParams = new URLSearchParams();
  if (params.page !== undefined)
    queryParams.append("page", params.page.toString());
  if (params.size !== undefined)
    queryParams.append("size", params.size.toString());
  if (params.q) queryParams.append("q", params.q);

  const url = `${BASE_URL}/api/super-admin/user?${queryParams.toString()}`;

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
      errorData.message || `Failed to fetch users: ${response.status}`
    );
  }

  const result = await response.json();

  if (
    !result ||
    !Array.isArray(result.users) ||
    typeof result.total !== "number"
  ) {
    // console.log("All users:", result);
    throw new Error("Invalid response format from server.");
  } else {
    console.log("Fetched users:", result);
    return result as FetchUsersResponse;
  }
};

export const useUsers = (params: FetchUsersParams) => {
  return useQuery<FetchUsersResponse, Error>({
    queryKey: ["users", params],
    queryFn: () => fetchUsersApi(params),
    enabled: !!params,

    retry: false,
  });
};
