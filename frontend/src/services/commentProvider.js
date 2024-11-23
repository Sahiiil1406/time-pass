import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:1406/comments'}),
    endpoints: (builder) => ({
        addPostComment: builder.mutation({
            query: (body,postId) => ({
                url: `/addComment/${postId}`,
                method: 'POST',
                body,
            }),
        }),
        getPostComments: builder.query({
            query: (postId) => ({
                url: `/getPostComments/${postId}`,
                method: 'GET',
            }),
        }),
        addRepliestoComment: builder.mutation({
            query: (body) => ({
                url: '/addRepliestoComment',
                method: 'POST',
                body,
            }),
        }),
        deleteComment: builder.mutation({
            query: (commentId) => ({
                url: `/deleteComment/${commentId}`,
                method: 'DELETE',
            }),
        }),
        updateComment: builder.mutation({
            query: (commentId, body) => ({
                url: `/updateComment/${commentId}`,
                method: 'PUT',
                body,
            }),
        }),

        addPollComment: builder.mutation({
            query: (body,pollId) => ({
                url: `/addPollComment/:${pollId}`,
                method: 'POST',
                body,
            }),
        }),
        getPollComments: builder.query({
            query: (pollId) => ({
                url: `/getPollComments/${pollId}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useAddPostCommentMutation,
    useGetPostCommentsQuery,
    useAddRepliestoCommentMutation,
    useDeleteCommentMutation,
    useUpdateCommentMutation,
    useAddPollCommentMutation,
    useGetPollCommentsQuery,
} = commentApi;
export default commentApi;