import { apiSlice } from "../../app/api/apiSlice";

export const manageEventsApiSlice = apiSlice.injectEndpoints({
<<<<<<< HEAD
  endpoints: (builder) => ({
    getEvents: builder.query({
=======
  endpoints: (build) => ({
    getManageEvents: build.query({
>>>>>>> auth_feature
      query: () => "/admin/manage-events",
      keepUnusedDataFor: 5,
    }),
  }),
});

<<<<<<< HEAD
export const { useGetEventsQuery } = manageEventsApiSlice;
=======
export const { useGetManageEventsQuery } = manageEventsApiSlice;
>>>>>>> auth_feature
