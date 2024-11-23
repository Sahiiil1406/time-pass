import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const likeApi=createApi({
    reducerPath:'likeApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:1406/likes'}),
    endpoints:(builder)=>({
        likePost:builder.query({
            query:(id)=>({
                url:`/likePost/${id}`,
                method:'POST'
            })
        }),

        likePoll:builder.mutation({
            query:(id)=>({
                url:`/likePoll/${id}`,
                method:'POST',
            })
        }),
        likeComment:builder.mutation({
            query:(id)=>({
                url:`/likeComment/${id}`,
                method:'POST',
            })
        })
    })
})

export const {useLikePostQuery,useLikePollMutation,useLikeCommentMutation}=likeApi
export default likeApi