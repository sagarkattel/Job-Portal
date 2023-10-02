import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type JobType={
    id: number;
    company: string;
    new: boolean;
    position: string;
    role: string;
    postedAt:string;

}

export type ResponseJobType = {
    id: number;
    company: string;
    new: boolean;
    position: string;
    role: string;
    postedAt: string;
    contract: string;
    location: string;
    languages: string[]; 
    tools: string[];    
    _id: string;
    __v: number;
  };

export const apiJob=createApi({
    reducerPath:"apiJobs",
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:8000/api/v1/'
    }),
    tagTypes:['Jobs'],
    endpoints:(builder)=>({
        getJobs:builder.query<ResponseJobType[],null>({
            query:()=>'alljobs',
            providesTags:['Jobs']
        }),
        postJob:builder.mutation<ResponseJobType,JobType>({
            query:(detail)=>({
                url:'postjob',
                method:'POST',
                body:detail,
            }),
            invalidatesTags:['Jobs']
        }),

    })
});

export const {useGetJobsQuery,usePostJobMutation}=apiJob;