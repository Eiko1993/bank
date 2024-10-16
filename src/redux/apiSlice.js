import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api', // The slice name for the API
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/v1' }), // API Base URL
    endpoints: (builder) => ({
      loginUser: builder.mutation({
        query: (userParams) => ({
          url: 'http://localhost:3001/api/v1/user/login',
          method: 'POST',
          body: userParams, // Body should include email and password
        }),
      }),
      getUserProfile: builder.query({
        query: () => 'http://localhost:3001/api/v1/user/profile',
      }),
    }),
  });
    // Export hooks generated by RTK Query
    export const { useLoginUserMutation, useGetUserProfileQuery } = api;