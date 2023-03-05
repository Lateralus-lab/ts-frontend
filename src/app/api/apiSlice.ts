import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  credentials: "include",
  prepareHeaders: (headers, { getState }: any) => {
    const token = getState().auth.token;
    if (token) {
      headers.append("Content-Type", "application/json");
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// get token from response using regex
const getAccessToken = (data: string) => {
  var tokenMatch = data.match(/(?<=s_token":").+(?="(?=,))/)?.toString();
  if (tokenMatch === undefined) return null;
  return tokenMatch;
};

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("sending refresh token");
    // send refresh token to get a new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    if (refreshResult?.data) {
      const email = api.getState().auth.user;
      // set new access token
      var accessToken = getAccessToken(JSON.stringify(refreshResult.data));
      console.log("refresh token result", accessToken);
      api.dispatch(setCredentials({ accessToken, email }));
      // retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
