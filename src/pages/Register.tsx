import React, { useState } from "react";

// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { RegisterT, useRegisterUserMutation } from "../redux/services/apiUser";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  name:yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(3).max(32).required("Password is required"),
});



const Register = () => {


  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const [registerUser] = useRegisterUserMutation();

  

  const [error,setError]=useState<any>("");


  
    // eslint-disable-next-line
    const [cookies, setCookie] = useCookies(['token']);

  const [loading, setLoading] = useState(false);


  const onSubmitHandler = async (data: RegisterT) => {
    // console.log(data);
    setLoading(true);
    try {
      const response = await registerUser(data);

      if (
        "data" in response &&
        "user" in response.data &&
        "accessToken" in response.data
      ) {
        // console.log("Register Successful:", response.data);
        setLoading(false);
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        // expirationDate.setSeconds(expirationDate.getSeconds() + 7);
        setCookie("token", response.data.accessToken, {
          path: "/",
          expires: expirationDate,
        });

        navigate("/");
      } else if ("data" in response && "error" in response.data) {
        setLoading(false);
        setError(response.data.error);
        // console.log("error:", response.data.error);
      } else {
        console.log("Uknown Error");
      }
    } catch (e) {
      console.log(e);
    }
  };


  // const handleRegister = (e:any) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const formData={name,email,password}

  //   axios
  //     .post("http://localhost:8000/api/v1/register", formData)
  //     .then((response) => {
  //       if(response.data.error){
  //           setError(response.data.error);
  //           setLoading(false);
  //           // alert(response.data.error);
  //       }
  //     else if (response.status === 200 &&!response.data.error) {
  //       setLoading(false);
  //       // console.log("Login successful:", response.data);
  //       const expirationDate = new Date();
  //       expirationDate.setDate(expirationDate.getDate() + 7);
  //       setCookie('token', response.data.accessToken, { path: '/',  expires: expirationDate });

  //       navigate("/")
        
  //       } else {
  //         console.log("Register Failed:", response.data.error);
  //         return;
  //       }
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       console.error("Error:", error);
  //     });
  // };


  return (
    <div className="flex justify-center items-center h-screen">
      {/* {token&&token} */}
      <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="flex flex-col gap-6 bg-yellow-500 h-auto w-[400px] items-center justify-center rounded-md p-4">
        <p className="font-bold text-2xl ">Register</p>
        <div className="flex flex-col gap-6 items-center justify-center">
          <input
            type="name"
            {...register("name")}
            name="name"
            placeholder="Name"
            className="rounded p-2 w-[300px]"
          />
          <p className="text-red-500 font-bold">{errors?.name?.message}</p>
          <input
            type="email"
            {...register("email")}
            name="email"
            placeholder="Email Address"
            className="rounded p-2 w-[300px]"
          />
          <p className="text-red-500 font-bold">{errors?.email?.message}</p>
          <input
            type="password"
            {...register("password")}
            name="password"
            placeholder="Password"
            className="rounded p-2 w-[300px]"
          />
          <p className="text-red-500 font-bold">{errors?.password?.message}</p>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4  rounded w-[300px]"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
          </button>
          {error&&<p className='text-red-500 font-bold'>{error}</p>}
          <span className="text-blue-900 font-medium justify-center">
            Already have an account yet?{" "}
            <a href="/login" className="underline">
              Login
            </a>
          </span>
        </div>
      </div>
      </form>
    </div>
  );
};

export default Register;
