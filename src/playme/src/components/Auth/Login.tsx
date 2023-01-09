"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
import { useState } from "react";
import Divider from "../Features/Basic/Divider";
import { UserCard } from "./UserCard";

export default function Login() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async() => {
    const apiUrl = process.env.BASE_API_URL + `Users/Login`;
    const result = await fetch(apiUrl , { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    });
  }

  return (
    <>
      {status === "authenticated" ? (
        <UserCard user={session?.user} />
      ) : (
        <section>
        <div className="section-form-div">
            <a href="/" className="form-title-with-image">
                <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                PlayMe   
            </a>
            <div className="form-container form-width-fifty">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="form-title">
                        Create and account
                    </h1>
                    <form className="form-spaces" onSubmit={login}>
                        <div>
                            <label className="lable-text-form">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-input" placeholder="playme@company.com" required={true}/>
                        </div>
                        <div>
                            <label className="lable-text-form">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="form-input" required={true}/>
                        </div>
                        <button type="submit" className="login-button">LOGIN</button>

                        <p className="form-sub-text">
                          Need to create an account? <a href="./createuser" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Create now...</a>
                        </p>

                        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                          <p className="text-center font-semibold mx-4 mb-0">OR</p>
                        </div>

                        <button type="button" className="blue-button" onClick={() => signIn()}>
                          Sign in with Google
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </section>
      )}
    </>
  );
}
