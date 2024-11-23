import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const eventsApi=createApi({
    reducerPath:'eventsApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:1406/events'}),
    endpoints:(builder)=>({
        createEvent:builder.mutation({
            query:(body)=>({
                url:'/create',
                method:'POST',
                body
            })
        }),
        getEventsById:builder.query({
            query:(id)=>({
                url:`/get/${id}`,
                method:'GET'
            })
        }),
        updateEventById:builder.mutation({
            query:(id,body)=>({
                url:`/update/${id}`,
                method:'PUT',
                body
            })
        }),
        deleteEventById:builder.mutation({
            query:(id)=>({
                url:`/delete/${id}`,
                method:'DELETE'
            })
        }),
        searchEvents:builder.query({
            query:(body)=>({
                url:'/searchEvents',
                method:'POST',
                body
            })
        }),
        myEvents:builder.query({
            query:()=>({
                url:'/myEvents',
                method:'GET'
            })
        }),
        getAllEvents:builder.query({
            query:()=>({
                url:'/getAllEvents',
                method:'GET'
            })
        }),
        upComingEvents:builder.query({
            query:()=>({
                url:'/upComingEvents',
                method:'GET'
            })
        }),
        pastEvents:builder.query({
            query:()=>({
                url:'/pastEvents',
                method:'GET'
            })
        }),
        onGoingEvents:builder.query({
            query:()=>({
                url:'/onGoingEvents',
                method:'GET'
            })
        }),
        //params is passed as body
        filterEvents:builder.query({
            query:(body)=>({
                url:'/filteredEvents',
                method:'POST',
                body
            })
        }),
        joinOrLeaveEvent:builder.mutation({
            query:(id)=>({
                url:`/joinLeaveEvent/${id}`,
                method:'POST'
            })
        }),
        
    })
})

export const {useCreateEventMutation,useGetEventsByIdQuery,useUpdateEventByIdMutation,useDeleteEventByIdMutation,useSearchEventsQuery,useMyEventsQuery,useGetAllEventsQuery,useUpComingEventsQuery,usePastEventsQuery,useOnGoingEventsQuery,useFilterEventsQuery,useJoinOrLeaveEventMutation}=eventsApi
export default eventsApi