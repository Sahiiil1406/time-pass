import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const userApi= createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1406/users'
    ,credentials:'include' }
    ),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
                
            }),
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: '/signup',
                method: 'POST',
                body: credentials

            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),
        updateUser: builder.mutation({
            query: (credentials) => ({
                url: '/update',
                method: 'PUT',
                body: credentials
            }),
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: '/api/allUser',
                method: 'GET',
            }),
        }),
        getUser: builder.query({
            query: (username) => ({
                url: `/get/${username}`,
                method: 'GET',
            }),
        }),
        generateOTP: builder.mutation({
            query: (email) => ({
                url: '/generateOTP',
                method: 'POST',
                body: email
            }),
        }),
        verifyOTP: builder.mutation({
            query: (credentials) => ({
                url: '/verifyOTP',
                method: 'POST',
                body: credentials
            }),
        }),
        resetPassword: builder.mutation({
            query: (credentials) => ({
                url: '/resetPassword',
                method: 'POST',
                body: credentials
            }),
        }),
        hell: builder.query({
            query: () => "/hello",
        }),
        mainfeed: builder.query({
            query: () => "/feed/mainfeed",
        }),
      

    })
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation,
    useUpdateUserMutation, useGetAllUsersQuery, useGetUserQuery,
    useGenerateOTPMutation, useVerifyOTPMutation, useResetPasswordMutation,
    useHellQuery,useMainfeedQuery
} = userApi;
export default userApi;
