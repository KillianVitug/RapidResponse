import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User","Stations", "Customers", "Reports","Overall","Dashboard"],
    endpoints: (build) => ({
        getUser: build.query({
          query: (id) => `general/user/${id}`,
          providesTags: ["User"],
        }),
        getStations: build.query({
            query: () => "client/stations",
            providesTags: ["Stations"],
        }),
        getCustomers: build.query({
            query: () => "client/customers",
            providesTags: ["Customers"],
        }),
        getReports: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "client/reports",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["Reports"]
        }),
        getOverall: build.query({
            query: () => "sales/overall",
            providesTags: ["Overall"]
        }),
        getDashboard: build.query({
            query: () => "general/dashboard",
            providesTags: ["Dashboard"]
        })
    }),
});

export const { useGetUserQuery, useGetStationsQuery, useGetCustomersQuery, useGetReportsQuery, useGetOverallQuery, useGetDashboardQuery} = api;