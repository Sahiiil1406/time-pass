import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const notificationApi=createApi({
    reducerPath:'notificationApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:1406/notifications'}),
    endpoints:(builder)=>({
        getMyNotifications:builder.query({
            query:()=>({
                url:'/getMyNotifications',
                method:'GET'
            })
        }),

        createNotification:builder.mutation({
            query:(body)=>({
                url:'/createNotification',
                method:'POST',
                body
            })
        })
    })
})

export const {useGetMyNotificationsQuery,useCreateNotificationMutation}=notificationApi
export default notificationApi