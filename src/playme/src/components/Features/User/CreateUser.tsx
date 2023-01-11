'use client'
import { useState } from "react";
import {useForm} from 'react-hook-form'
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import React from "react";
import {useRouter} from 'next/navigation'

export default function CreateUser(){
  let password : string;
  let email : string;
  const [unTakenEmail, setunTakenEmail] = useState(true);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');

  const router = useRouter();

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    cpassword: Yup.string()
      .required("Confirm Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
    email: Yup.string()
       .email()
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema)
  });
  password = watch("password", "");
  email = watch("email", "");

  const createNewUser = async (e) => {
    e.preventDefault();

    const apiUrl =  process.env.NEXT_PUBLIC_BASE_API_URL + "Users/CreateUser";
    const result = await fetch(apiUrl , { 
      method: 'POST',
      mode:'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"email":email, "name":name, "lastname":lastname, "password":password})
    }).catch(err =>{
      console.log(err);
    });

    if(result.ok)
    router.push("/");

    setunTakenEmail(result.ok);
  }

  return (
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
              <form className="form-spaces" >
                  <div>
                      <label className="lable-text-form">Your email</label>
                      <input type="email" id="email" className="form-input" placeholder="playme@company.com" required={true} {...register("email")}/>
                      <p className="alerts">{errors.email?.message === undefined && !unTakenEmail ? "This email already taken" : errors.email?.message  as any}</p>
                  </div>
                  <div>
                      <label className="lable-text-form">Name</label>
                      <input onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="form-input" placeholder="Mario" required={true}/>
                  </div>
                  <div>
                      <label className="lable-text-form">Last Name</label>
                      <input onChange={(e) => setLastname(e.target.value)} type="text" name="lastname" id="lastname" className="form-input" placeholder="Rossi" required={true}/>
                  </div>
                  <div>
                      <label className="lable-text-form">Password</label>
                      <input type="password" id="password" placeholder="••••••••" className="form-input" required={true} {...register("password")}/>
                      <p className="alerts">{errors.password?.message as any}</p>
                  </div>
                  <div>
                      <label className="lable-text-form">Confirm password</label>
                      <input type="password"  id="confirm-password" placeholder="••••••••" className="form-input"  required={true} {...register("cpassword")}/>
                      <p className="alerts">{errors.cpassword?.message as any}</p>
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="check-terms" required={true}/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="check-lable" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button onClick={(e) => createNewUser(e)} className="login-button">Create an account</button>
                  <p className="form-sub-text">
                      Already have an account? <a href="/" className="form-sub-text-underline">Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  );
}