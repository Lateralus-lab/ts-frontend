import { apiSlice } from "../../app/api/apiSlice";

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => "/events",
      keepUnusedDataFor: 5,
    }),
    getManageEvents: builder.query({
      query: () => "/admin/events",
      keepUnusedDataFor: 5,
    }),
    getGenres: builder.query({
      query: () => ({
        url: `/genres`,
      }),
    }),
    addEvent: builder.mutation({
      query: (requestOptions) => ({
        url: `/admin/events/${requestOptions.body.id}`,
        method: requestOptions.method,
        body: requestOptions.body,
        credentials: requestOptions.credentials,
      }),
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetManageEventsQuery,
  useAddEventMutation,
} = eventsApiSlice;
