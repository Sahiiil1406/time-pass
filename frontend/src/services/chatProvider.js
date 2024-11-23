import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:1406/chat'}),
    endpoints: (builder) => ({
        getAllChats: builder.query({
            query: () => ({
                url: '/all',
                method: 'GET',
            }),
        }),
        createAGroupChat: builder.mutation({
            query: (body) => ({
                url: '/group',
                method: 'POST',
                body,
            }),
        }),
        createOrGetAOneOnOneChat: builder.mutation({
            query: (body) => ({
                url: '/one-on-one',
                method: 'POST',
                body,
            }),
        }),
        getGroupChatDetails: builder.query({
            query: (chatId) => ({
                url: `/group/${chatId}`,
                method: 'GET',
            }),
        }),
        renameGroupChat: builder.mutation({
            query: (chatId, body) => ({
                url: `/group/${chatId}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteGroupChat: builder.mutation({
            query: (chatId) => ({
                url: `/group/${chatId}`,
                method: 'DELETE',
            }),
        }),
        addNewParticipantInGroupChat: builder.mutation({
            query: (chatId, body) => ({
                url: `/group/${chatId}/add-participant`,
                method: 'PUT',
                body,
            }),
        }),
        removeParticipantFromGroupChat: builder.mutation({
            query: (chatId, body) => ({
                url: `/group/${chatId}/remove-participant`,
                method: 'PUT',
                body,
            }),
        }),
        leaveGroupChat: builder.mutation({
            query: (chatId) => ({
                url: `/group/${chatId}/leave`,
                method: 'DELETE',
            }),
        }),
        searchAvailableUsers: builder.query({
            query: () => ({
                url: '/search-users',
                method: 'GET',
            }),
        }),
        deleteOneOnOneChat: builder.mutation({
            query: (chatId) => ({
                url: `/one-on-one/${chatId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetAllChatsQuery,
    useCreateAGroupChatMutation,
    useCreateOrGetAOneOnOneChatMutation,
    useGetGroupChatDetailsQuery,
    useRenameGroupChatMutation,
    useDeleteGroupChatMutation,
    useAddNewParticipantInGroupChatMutation,
    useRemoveParticipantFromGroupChatMutation,
    useLeaveGroupChatMutation,
    useSearchAvailableUsersQuery,
    useDeleteOneOnOneChatMutation,
} = chatApi;

export default chatApi;