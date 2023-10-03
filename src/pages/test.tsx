import React from 'react'

import {  RegisterT, useGetUsersQuery,useRegisterUserMutation } from '../redux/services/apiUser.tsx';

import {useForm} from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  name:yup.string().required(),
  email:yup.string().email().required(),
  password:yup.string().min(8).max(32).required()
});




const Test = () => {


  const {register,handleSubmit,formState:{errors},reset}=useForm({
    defaultValues:{
      name:'',
      email:'',
      password:''
    },
    resolver:yupResolver(schema)
  });



  const {data}=useGetUsersQuery(null);
  const [registerUser] = useRegisterUserMutation();

  // const [name,setName]=useState("");
  // const [email,setEmail]=useState("");
  // const [password,setPassword]=useState("");




  const onSubmitHandler=async(data:RegisterT)=>{
    console.log({data});
    try{
      await registerUser(data);
      reset();
      // const data = response.data;
      // console.log('Data:', data);
  
    }
      catch(e){
        console.log(e)
      }

  }



  // const handleSubmit=async(e: React.FormEvent<HTMLFormElement>)=>{
  //   e.preventDefault();
  //   try{
  //   await registerUser({name,email,password});
  //   // const data = response.data;
  //   // console.log('Data:', data);

  // }
  //   catch(e){
  //     console.log(e)
  //   }
  // }


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

    <form onSubmit={handleSubmit(onSubmitHandler)} className='flex items-center justify-center flex-col gap-9 bg-red-400'>
      <div>Form</div>
      <input {...register("name")} type="text" name="name"/>
      <p>{errors?.name?.message}</p>
      <input {...register("email")} type="email" name='email'  />
      <p>{errors?.email?.message}</p>
      <input {...register("password")} type="password" name='password' />
      <p>{errors?.password?.message}</p>
      <button type='submit'>Register</button>
    </form>

    

    </div>

  )
}

export default Test
