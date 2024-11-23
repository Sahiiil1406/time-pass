import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const bookmarkApi=createApi({
    reducerPath:'bookmarkApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:1406/bookmarks'}),
    endpoints:(builder)=>({
        bookmarkAndUnbookmarkPost:builder.mutation({
            query:(postId)=>({
                url:`/markAndUnmark/${postId}`,
                method:'POST'
            })
        }),
        getBookmarkedPosts:builder.query({
            query:()=>({
                url:'/get',
                method:'GET'
            })
        })
    })
})

export const {useBookmarkAndUnbookmarkPostMutation,useGetBookmarkedPostsQuery}=bookmarkApi
export default bookmarkApi