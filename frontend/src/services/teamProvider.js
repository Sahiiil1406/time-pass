import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const teamApi = createApi({
    reducerPath: 'teamApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:1406/teams', credentials: 'include'}),
    endpoints: (builder) => ({
        getTeamById: builder.query({
            query: (id) => ({
                url: `get/${id}`,
                method: 'GET',
            }),
        }),
        createTeam: builder.mutation({
            query: (team) => ({
                url: '/create',
                method: 'POST',
                body: team
            }),
        }),
        deleteTeam: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE',
            }),
        }),
        updateTeam: builder.mutation({
            query: (id, team) => ({
                url: `/update/${id}`,
                method: 'PUT',
                body: team
            }),
        }),
        taskCompleted: builder.mutation({
            query: (id) => ({
                url: `/taskcompleted/${id}`,
                method: 'PUT',
            }),
        }),
        addMemberbyPost:builder.mutation({
             query:(id)=>({
                url:`/addmember/${id}`,
                method:'PUT'

             })
        }),
        getMyteam: builder.query({
            query: (username) => ({
                url: `/myteam`,
                method: 'GET',
            }),
        }),
    }),
});


export const {useGetTeamByIdQuery, useCreateTeamMutation, useDeleteTeamMutation, useUpdateTeamMutation, useTaskCompletedMutation, useAddMemberbyPostMutation, useGetMyteamQuery} = teamApi;
export default teamApi;