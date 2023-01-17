import { apiSlice } from "../../app/api/apiSlice";

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => "/events",
    }),
  }),
});

export const { useGetEventsQuery } = eventsApiSlice;
