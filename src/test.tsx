import React, {  useState } from 'react'

import {  useGetUsersQuery,useRegisterUserMutation } from './redux/services/apiUser.tsx';




const Test = () => {

  const {data}=useGetUsersQuery(null);
  const [registerUser] = useRegisterUserMutation();

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const handleSubmit=async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
    await registerUser({name,email,password});
    // const data = response.data;
    // console.log('Data:', data);

  }
    catch(e){
      console.log(e)
    }
  }


  // useEffect(()=>{
  //   setInterval(()=>{
  //     console.log("Hello World")
  //   },3000)
    
  // },[])


  return (

    <div>
    <h1>Hello</h1><br/>

    {data&&data.map((da)=>(
      <div key={da._id}>
        <p>{da.name}</p></div>
    ))}

    <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col gap-9 bg-red-400'>
      <div>Form</div>
      <input type="text" name="name" value={name}  onChange={(e)=>setName(e.target.value)}/>
      <input type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button type='submit'>Register</button>
    </form>

    

    </div>

  )
}

export default Test
