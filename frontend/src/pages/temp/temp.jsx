import {useLoginMutation, useRegisterMutation, useLogoutMutation,useHellQuery,useGetUserQuery} from '../../services/authProvider'


import {useDispatch,useSelector} from 'react-redux'




import React, { useEffect, useState } from 'react'

const Temp = () => {
    
    const [x]=useCreatePostMutation()
    const loginUser=async()=>{
        try {
            const data=await x({
                question:"hello",
                options:[
               {text:"o1"}
             ]
            })
            console.log(data)
        }
        catch (error) {
            console.log(error.data)
        }
    } 
   /*  const { data, isLoading, error } = useGetUserQuery('abhay');
   if(isLoading){
    console.log('loading...')
   }
   if(error){
    console.log(error)
   }else{
    console.log(data)
   }  */
   /*  *//*  const { data, isLoading, error } = useGetMyteamQuery();
   if(isLoading){
    console.log('loading...')
   }
   if(error){
    console.log(error)
   }else{
    console.log(data)
   }   */
    
   
   
    

    
  return (
   <>
    <div>hi</div>
    <button onClick={loginUser}>Click</button>
    <br />
    
   </>
  )
}

export default Temp