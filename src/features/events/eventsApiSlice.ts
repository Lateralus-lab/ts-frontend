import { apiSlice } from "../../app/api/apiSlice";

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => "/events",
    }),
    getManageEvents: builder.query({
      query: () => "/admin/events",
      keepUnusedDataFor: 5,
    }),
    getEvent: builder.mutation({
      query: (id: any) => ({
        url: `/events/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetManageEventsQuery,
  useGetEventMutation,
} = eventsApiSlice;