import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState("");


  
    // eslint-disable-next-line
    const [cookies, setCookie] = useCookies(['token']);

  const [loading, setLoading] = useState(false);



  const handleRegister = (e:any) => {
    e.preventDefault();
    setLoading(true);
    const formData={name,email,password}

    axios
      .post("http://localhost:8000/api/v1/register", formData)
      .then((response) => {
        if(response.data.error){
            setError(response.data.error);
            setLoading(false);
            // alert(response.data.error);
        }
      else if (response.status === 200 &&!response.data.error) {
        setLoading(false);
        // console.log("Login successful:", response.data);
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        setCookie('token', response.data.accessToken, { path: '/',  expires: expirationDate });

        navigate("/")
        
        } else {
          console.log("Register Failed:", response.data.error);
          return;
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  };


  return (
    <div className="flex justify-center items-center h-screen">
      {/* {token&&token} */}
      <div className="flex flex-col gap-6 bg-yellow-500 h-[400px] w-[400px] items-center justify-center rounded-md">
        <p className="font-bold text-2xl ">Register</p>
        <div className="flex flex-col gap-6 items-center justify-center">
          <input
            type="email"
            name="name"
            placeholder="Name"
            className="rounded p-2 w-[300px]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="rounded p-2 w-[300px]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="rounded p-2 w-[300px]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4  rounded w-[300px]"
            onClick={handleRegister}
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
    </div>
  );
};

export default Register;
