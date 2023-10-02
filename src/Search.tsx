import React from 'react'
// import data from './data.json';
import { useState,useEffect,useRef  } from 'react';

import { useNavigate } from "react-router-dom";
import { ResponseJobType, useGetJobsQuery } from './redux/services/apiJobs';


export const Search = () => {
  const navigate=useNavigate();

  const [clicked,isClicked]=useState(false);


  const ref = useRef<HTMLUListElement | null>(null);

  const {data}=useGetJobsQuery(null);

  useEffect(() => {
    const handleClickOutside = (event:MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        isClicked((prevClicked) => !prevClicked);
      }
    };
  
    const handleScroll = () => {
      isClicked(false);
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('scroll', handleScroll);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);
  


 
  const [query, setQuery] = useState("");

  const handleClick=()=>{
    isClicked((prevClicked) => !prevClicked);
  }
  const handleMore =(job:ResponseJobType)=>{
    navigate(`/jobdetail/${job.id}`, { state: { job } });
  }
  return (
    <div>
    <div className="py-[20px] px-[140px] hidden md:block">
      <input type="search" className='h-[60px] w-[1060px] rounded-md pl-[15px]' placeholder='Search Positions...' onClick={handleClick} onChange={(e) => setQuery(e.target.value)}/>
      {clicked&&
      <ul ref={ref} className='left-[155px] top-[229px] z-50 bg-white w-[290px] h-[500px] overflow-x-auto overflow-scroll border-2 fixed p-3' >
                {data&&data.filter((datas) =>
                  datas.position.includes(query)
                ).map((datas) => (
                  <li className='cursor-pointer hover:scale-105 duration-300 border-b-2  h-15 z-1000' key={datas.id} onClick={() => handleMore(datas)}>{datas.position}</li>
                ))
                }
              </ul>
      }
      </div>
    </div>
  )
}
