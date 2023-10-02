import React, { useState } from "react";

// import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  useLoginUserMutation,
} from "./redux/services/apiUser.tsx";
import { MouseEvent } from 'react';


// type Error={
//   error:string;
//   setError:React.Dispatch<React.SetStateAction<string>>
// }

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<any>("");

  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(["token"]);

  const [loginUser] = useLoginUserMutation();

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser({
        email,
        password,
      });

      if (
        "data" in response &&
        "user" in response.data &&
        "accessToken" in response.data
      ) {
        console.log("Login Successful:", response.data);
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
        console.log("error:", response.data.error);
      } else {
        console.log("Uknown Error");
      }

      // if ('error' in response) {
      //   console.log("error:",response.error);
      //   // Handle the error here
      // } else if ('user' in response.data) {
      //   // Handle the successful response
      //   console.log("success:",response.data);
      // } else {
      //   // Handle unexpected response structure
      //   console.log('Unexpected response structure:', response);
      // }

      // if (response.data.error) {
      //   setError(response.data.error);
      //   setLoading(false);
      //   // alert(response.data.error);
      // } else if (!response.data.error) {
      //   setLoading(false);
      //   // console.log("Login successful:", response.data);
      // const expirationDate = new Date();
      // expirationDate.setDate(expirationDate.getDate() + 7);
      // // expirationDate.setSeconds(expirationDate.getSeconds() + 7);
      // setCookie("token", response.data.accessToken, {
      //   path: "/",
      //   expires: expirationDate,
      // });

      // navigate("/");
      // } else {
      //   console.log("Login failed:", response.data.error);
      // }
    } catch (e) {
      console.log(e);
    }
  };

  // const handleLogin=(e)=>{
  //     e.preventDefault();
  //     setLoading(true);
  //     const formData = { email, password };
  // axios
  // .post("http://localhost:8000/api/v1/login", formData)
  // .then((response) => {
  //     if(response.data.error){
  //         setError(response.data.error);
  //         setLoading(false);
  //         // alert(response.data.error);
  //     }
  //   else if (response.status === 200 &&!response.data.error) {
  //     setLoading(false);
  //     // console.log("Login successful:", response.data);
  //     const expirationDate = new Date();
  //     expirationDate.setDate(expirationDate.getDate() + 7);
  //     setCookie('token', response.data.accessToken, { path: '/',  expires: expirationDate });

  //     navigate("/")
  //   } else {
  //     console.log("Login failed:", response.data.error);
  //   }
  // })
  // .catch((error) => {
  //     setLoading(false);
  //   console.error("Error:", error);
  // })
  // }

  // useEffect(()=>{
  //     setFormData({...formData,email,password});
  //     console.log(formData);
  // },[email,password]);

  return (
    <div className="flex justify-center items-center h-screen">
      {/* {token&&token} */}
      <div className="flex flex-col gap-6 bg-yellow-500 h-[400px] w-[400px] items-center justify-center rounded-md">
        <p className="font-bold text-2xl ">Login</p>
        <div className="flex flex-col gap-6 items-center justify-center">
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
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-500 font-bold">{error}</p>}
          <span className="text-blue-900 font-medium justify-center">
            Don't have an account yet?{" "}
            <a href="/register" className="underline">
              Register
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
