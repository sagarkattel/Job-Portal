
import {  createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type RegisterT={
    name:string;
    email:string;
    password:string;
}

export type LoginT={
    email:string;
    password:string;
}

export type ResponseUserType = {
    user?: {
      name: string;
      email: string;
      password:string;
      _id:string;
      __v:number;
    };
    error?:string;
    accessToken?: string;
};

export type QueryUserT = {
      name: string;
      email: string;
      password:string;
      _id:string;
      __v:number;
};



export const apiUser=createApi({
    reducerPath:'apiUser',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:8000/api/v1/',
    }),
    tagTypes: ['Users'],
    endpoints:(builder)=>({
        getUsers:builder.query<QueryUserT[],null>({
            query:()=>'users',
            providesTags:['Users']
        }),
        registerUser: builder.mutation<ResponseUserType,RegisterT>({
            query: (details) => ({
              url: '/register',
              method: 'POST',
              body: details,
            }),
            invalidatesTags: ['Users'],
        }),
        loginUser:builder.mutation<ResponseUserType,LoginT>({
            query:(details)=>({
                url:"/login",
                method:'POST',
                body:details,
            }),
            invalidatesTags: ['Users'],
            
        })

    })
})




export const {useGetUsersQuery,useRegisterUserMutation,useLoginUserMutation}=apiUser;