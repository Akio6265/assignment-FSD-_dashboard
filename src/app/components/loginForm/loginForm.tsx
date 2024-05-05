"use client"
import React, { useState, ChangeEvent, FormEvent,useEffect } from 'react';
import './login.css';
import {switching} from './login'; //switching function is responsible to toggle between login and signup
import api from "../../apis.json";
import { useRouter } from "next/navigation";


export default function LoginForm() {
  const router = useRouter();
 useEffect(() => {
    switching()
 }, []);
 function showingResponse(color:string,message:string){
   const responseElement = document.createElement("div");
             responseElement.style.display = "flex";
             responseElement.style.color = color;
             responseElement.className = "response";  
             responseElement.textContent = message;
             document.getElementsByClassName("active-stuff")[0].appendChild(responseElement) as HTMLDivElement;
             setTimeout(() => {
               if (responseElement) {
                 responseElement.textContent = "";
                    if (responseElement && responseElement.parentNode) {
                      responseElement.parentNode.removeChild(responseElement);
                    }
               }
             }, 3000);
 }
 const [signupUsername, setSignupUsername] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
 const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [code, setCode] = useState("");

    const handleSignupSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const response: any = await fetch(api.signup, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data: {
                  username: signupUsername,
                  password: signupPassword,
                },
              }),
            });   
            const data = await response.json();
            if(!data){
              showingResponse("#DF826C","Failed to sign in, please try again later");
            }
            if (!response.ok) {
              showingResponse("#DF826C", data.message);
            } else {
             const { tokens:{ACCESS_TOKEN} } = data;
                     localStorage.setItem("accessToken", ACCESS_TOKEN);
             showingResponse("#c1f2b0", data.message);
             router.push("/2fa");
           }
            
        } catch (error) {
            console.error(error);
        showingResponse("#DF826C", "Signup failed, please try again later");
        }
    };
    const handleLoginSubmit = async (event: FormEvent) => {
      event.preventDefault();
      try {
        const response: any = await fetch(api.login, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              username: loginUsername,
              password: loginPassword,
              code
            },
          }),
        });
           const data = await response.json();
             if (!data) {
               showingResponse(
                 "#DF826C",
                 "Failed to login, please try again later"
               );
             }
             if (!response.ok) {
               showingResponse("#DF826C", data.message);
              } else {
                  const {
                    tokens: { ACCESS_TOKEN },
                  } = data;
                  localStorage.setItem("accessToken", ACCESS_TOKEN);    
                  showingResponse("#c1f2b0", data.message);
                    router.push("/dashboard");
                }
      } catch (error) {
        console.error(error);
        showingResponse("#DF826C", "login failed, please try again later");
      }
    };

    const handleSignupUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSignupUsername(event.target.value);
    };
    const handleCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
    };

    const handleSignupPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSignupPassword(event.target.value);
    };
    const handleLoginUsernameChange  = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginUsername(event.target.value);
    };

    const handleLoginPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginPassword(event.target.value);
    };
  return (
    <>
      <div className="bg"></div>
      <main>
        <header>
          <div className="active-form" id="active-login">
            Login
          </div>
          <div id="active-signup">Signup</div>
        </header>
        <div className="active-stuff" id="login-stuff">
          <form id="login" onSubmit={handleLoginSubmit}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              value={loginUsername}
              onChange={handleLoginUsernameChange}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={loginPassword}
              onChange={handleLoginPasswordChange}
            />
            <input
              id="code"
              type="password"
              name="code"
              placeholder="2FA code"
              value={code}
              onChange={handleCodeChange}
            />
            <button className="button-57" role="button" type="submit">
              <span className="text">Login</span>
              <span>Submit</span>
            </button>
          </form>
        </div>
        <div id="signup-stuff">
          <form id="signup" onSubmit={handleSignupSubmit}>
            <label htmlFor="signup-username">Username</label>
            <input
              id="signup-username"
              type="text"
              name="username"
              placeholder="Username"
              value={signupUsername}
              onChange={handleSignupUsernameChange}
            />
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              name="password"
              placeholder="Password"
              value={signupPassword}
              onChange={handleSignupPasswordChange}
            />
            <button className="button-57" role="button" type="submit">
              <span className="text">Signup</span>
              <span>Submit</span>
            </button>
          </form>
        </div>
      </main>
    </>
  );
};
