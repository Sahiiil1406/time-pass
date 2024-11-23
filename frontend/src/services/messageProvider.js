import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const messageApi=createApi({
    reducerPath:'messageApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:1406/messages'}),
    endpoints:(builder)=>({
        getMessages:builder.query({
            query:(id)=>({
                url:`/get/${id}`,
                method:'GET'
            })
        }),

        sendMessage:builder.mutation({
            query:(id,body)=>({
                url:`/send/${id}`,
                method:'POST',
                body
            })
        }),
        updateMessage:builder.mutation({
            query:(body)=>({
                url:'/update',
                method:'PUT',
                body
            })
        }),
        deleteMessage:builder.mutation({
            query:(body)=>({
                url:'/delete',
                method:'DELETE',
                body
            })
        })
    })
})

export const {useGetMessagesQuery,useSendMessageMutation,useUpdateMessageMutation,useDeleteMessageMutation}=messageApi
export default messageApi