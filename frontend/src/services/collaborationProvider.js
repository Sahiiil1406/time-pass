import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const collaboratorApi=createApi({
    reducerPath:'collaboratorApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:1406/collaborators'}),
    endpoints:(builder)=>({
       markAndUnmarkCollab:builder.mutation({
              query:(postId)=>({
                url:`/markAndUnmark/${postId}`,
                method:'POST'
              })
         }),

            getCollaboratorList:builder.query({
                query:(postId)=>({
                    url:`/getUserList/${postId}`,
                    method:'GET'
                })

              
    })
})
})

export const {useMarkAndUnmarkCollabMutation,useGetCollaboratorListQuery}=collaboratorApi
export default collaboratorApi