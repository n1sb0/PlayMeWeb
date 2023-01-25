"use client";

import { signIn } from "next-auth/react";
import React from "react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCredentialsSubmit = async (e : any) =>{
    e.preventDefault();

    const res = await signIn('credentials', {
      email: email,
      password: password
    })
  }

  const handleGooglesSubmit = async (e : any) =>{
    e.preventDefault();

    const res = await signIn('google')
  }

  return (
    <>
        <section>
        <div className="section-form-div">
            <img className="w-14 h-14 m-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
            <a className="form-title-with-image">
              Sign in to PlayMe
            </a>
            <div className="form-container form-width-fifty">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <form className="form-spaces" onSubmit={(e) => handleCredentialsSubmit(e)}>
                        <div>
                            <label className="lable-text-form">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-input" placeholder="playme@company.com" required={true}/>
                        </div>
                        <div>
                            <label className="lable-text-form">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="form-input" required={true}/>
                        </div>
                        <button className="login-button" type="submit">LOGIN</button>

                        <p className="form-sub-text">
                          Need to create an account? <a href="./register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Create now...</a>
                        </p>

                        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                          <p className="text-center font-semibold mx-4 mb-0">OR</p>
                        </div>

                        <button type="button" className="blue-button" onClick={(e) => handleGooglesSubmit(e)}>
                          Sign in with Google
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </section>
    </>
  );
}
