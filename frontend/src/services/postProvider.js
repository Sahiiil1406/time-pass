import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1406/posts'
    ,credentials:'include' }
    ),
    endpoints: (builder) => ({
        getPostById: builder.query({
            query: (id) => ({
                url: `get/${id}`,
                method: 'GET',
            }),
        }),
        
        createPost: builder.mutation({
            query: (post) => ({
                url: '/create',
                method: 'POST',
                body: post
            }),
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE',
            }),
        }),
        updatePost: builder.mutation({
            query: (id, post) => ({
                url: `/update/${id}`,
                method: 'PUT',
                body: post
            }),
        }),
        getUserPost: builder.query({
            query: (username) => ({
                url: `/getuserPost/${username}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetPostByIdQuery, useCreatePostMutation, useDeletePostMutation, useGetUserPostQuery,useUpdatePostMutation } = postApi;
export default postApi;