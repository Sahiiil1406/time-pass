import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const inviteApi=createApi({
    reducerPath:'inviteApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:1406/invites'}),
    endpoints:(builder)=>({
        getMyInvites:builder.query({
            query:()=>({
                url:'/get',
                method:'GET'
            })
        }),

        sendInvite:builder.mutation({
            query:(id)=>({
                url:`/send${id}`,
                method:'POST',
                body
            })
        }),
        acceptInvite:builder.mutation({
            query:()=>({
                url:`/accept/${body}`,
                method:'PUT',
            })
        }),
        rejectInvite:builder.mutation({
            query:()=>({
                url:`/reject/${body}`,
                method:'PUT',
            })
        })
    })
})

export const {useGetMyInvitesQuery,useSendInviteMutation,useAcceptInviteMutation,useRejectInviteMutation}=inviteApi
export default inviteApi