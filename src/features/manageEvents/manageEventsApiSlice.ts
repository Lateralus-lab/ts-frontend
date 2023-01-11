import { apiSlice } from "../../app/api/apiSlice";

export const manageEventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => "/admin/manage-events",
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetEventsQuery } = manageEventsApiSlice;
