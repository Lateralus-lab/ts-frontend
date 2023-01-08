import { apiSlice } from "../../app/api/apiSlice";

export const logoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    logOut: build.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
    }),
  }),
});

export const { useLogOutMutation } = logoutApiSlice;
