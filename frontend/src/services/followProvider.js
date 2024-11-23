import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const followApi=createApi({
    reducerPath:'followApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:1406/follows',
        credentials:'include'
    },
    ),
    endpoints:(builder)=>({
        followAndUnfollowUser:builder.mutation({
            query:(username)=>({
                url:`/followAndUnfollow/${username}`,
                method:'POST'
            })
        }),

        getFollowersListByUserName:builder.query({
            query:(username)=>({
                url:`/followers/${username}`,
                method:'GET'
            })
        }),
        getFollowingListByUserName:builder.query({
            query:(username)=>({
                url:`/following/${username}`,
                method:'GET'
            })
        }),
        blockOrUnblockUser:builder.mutation({
            query:(username)=>({
                url:`/block/${username}`,
                method:'POST'
            })
        }),
        getBlockedUsersList:builder.query({
            query:()=>({
                url:'/blocked',
                method:'GET'
            })
        })

    
    })
})

export const {useFollowAndUnfollowUserMutation,useGetFollowersListByUserNameQuery,useGetFollowingListByUserNameQuery,useBlockOrUnblockUserMutation,useGetBlockedUsersListQuery}=followApi
export default followApi
