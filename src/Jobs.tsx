import React from 'react'
// import data from './data.json';

import { useNavigate } from "react-router-dom";

// import axios from 'axios';
// import { useEffect } from 'react';
// import { useState} from 'react';
import { ResponseJobType, useGetJobsQuery } from './redux/services/apiJobs.tsx';
// import {useMemo } from 'react';



export const Jobs = () => {
  const navigate=useNavigate();



  // const [datas,setData]=useState([]);
  // // const [shouldFetch, setShouldFetch] = useState(true);

  // useEffect(() => {
  //   // if (shouldFetch) {
  //     axios.get("http://localhost:8000/api/v1/alljobs")
  //       .then(response => {
  //         console.log(response.data);
  //         setData(response.data);
  //         // setShouldFetch(false); // Set to false to prevent continuous fetching
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   // }
  // }, []);

  const {data}=useGetJobsQuery(null);
 

  const handleMore =(job:ResponseJobType)=>{
    navigate(`/jobdetail/${job.id}`, { state: { job } });
  }

 // Use useMemo to update shouldFetch whenever datas changes
//  useMemo(() => {
//   setShouldFetch(true);
// // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [datas]);

  return (
    <div>
      {data&&
        data.map((job,index) => (
        <div key={index} className="bg-white md:p-10 mx-[20px] my-[40px] md:mx-[140px] md:my-[20px] md:h-[150px] md:flex grid md:w-[1060px] w-[320px] h-[210px] cursor-pointer shadow-xl" onClick={()=>handleMore(job)}>
          <div className='md:flex grid'>

            {/* <img src={job.logo} alt="Company Logo" className='md:h-[80px] h-[50px] md:pl-[5px] pl-[20px] md:mt-0 mt-[-20px]'/> */}


            <div className='grid gap-2 pl-5 md:pt-0 pt-[10px] '>
              <div className='text-[#5BA4A4] font-bold text-sm'>{job.company}</div>
              <div className='md:text-[#5BA4A4] font-bold text-sm '>{job.position}</div>
              <div className='text-sm flex text-gray-500 font-semibold gap-3'>
                <span>{job.postedAt}</span>
                <span>. {job.contract}</span>
                <span>. {job.location}</span>
              </div>
            </div>
            <hr className='border-1 mx-4 mt-2 md:hidden '/>

            <div className='md:flex  font-bold text-sm  md:ml-[260px] md:mt-[25px] ml-[15px] mt-[6px]'>
              {job.languages.map((language, index) => (
                <span key={index} className="mr-5 text-[#5BA4A4] bg-[#EFFAFA] rounded h-[34px] p-[5px] hover:text-white hover:bg-[#5BA4A4] cursor-pointer">
                  {language}
                </span>
              ))}
            </div>

          </div>
        </div>
      ))}



    </div>
  )
}
