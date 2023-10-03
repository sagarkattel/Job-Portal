import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export const Jobdetail = () => {
  const navigate=useNavigate();
  const location = useLocation();
  const job = location.state.job; // Accessing the job details from the state

  const handleHome=()=>{
    navigate("/")
  }

  return (
    <div className='h-[780px]'>
      <h1 className='md:px-[590px] px-[130px] md:pt-[20px] pt-[30px] font-bold md:text-3xl text-xl '>Job Details</h1>
      <div className='md:py-[60px] py-[30px] px-9'><button onClick={handleHome} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4  rounded'>Back</button></div>
      <div className='md:flex grid'>

            <img src={job.logo} alt="Company Logo" className='md:h-[180px] h-[120px] md:pl-[280px] pl-[40px] mt-0'/>


            <div className='grid gap-2 md:pl-[320px] pl-[40px]  md:pt-0 pt-[30px] '>
              <div className='text-[#5BA4A4] font-bold text-sm'>Company: {job.company}</div>
              <div className='md:text-[#5BA4A4] font-bold text-sm '>Position: {job.position}</div>
              <div className='text-sm flex text-gray-500 font-semibold gap-3'>
                <span>{job.postedAt}</span>
                <span>. {job.contract}</span>
                <span>. {job.location}</span>
              </div>
              <div className='pt-[20px]'><button type="button" className='inline-block rounded bg-success md:px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] bg-green-500 h-[50px] px-6'>Apply for this Job</button></div>
            </div>
            </div>
    </div>
  )
}
