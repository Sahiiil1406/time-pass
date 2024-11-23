import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const pollApi = createApi({
    reducerPath: 'pollApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:1406/polls', credentials: 'include'}),
    endpoints: (builder) => ({
        getPollsbyId: builder.query({
            query: (id) => ({
                url: `/get/${id}`,
                method: 'GET',
            }),
        }),
        createPoll: builder.mutation({
            query: (poll) => ({
                url: '/create',
                method: 'POST',
                body: poll
            }),
        }),
        deletePoll: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE',
            }),
        }),
        updatePoll: builder.mutation({
            query: (id, poll) => ({
                url: `/update/${id}`,
                method: 'PUT',
                body: poll
            }),
        }),
        voteUnvoteFeedPoll: builder.mutation({
            query: (id) => ({
                url: `/vote/${id}`,
                method: 'POST',
            }),
        }),
    }),
});

export const {useGetPollsbyIdQuery, useCreatePollMutation, useDeletePollMutation, useUpdatePollMutation, useVoteUnvoteFeedPollMutation} = pollApi;
export default pollApi;