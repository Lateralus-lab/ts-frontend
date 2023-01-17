import { apiSlice } from "../../app/api/apiSlice";

export const manageEventsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getManageEvents: build.query({
            query: () => "/admin/manage-events",
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetManageEventsQuery } = manageEventsApiSlice;
