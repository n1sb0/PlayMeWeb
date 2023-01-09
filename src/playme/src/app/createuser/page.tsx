import React from "react";
import {getSessionToken} from "../../components/Auth/AuthHelper"
import CreateUser from "../../components/Features/User/createuser";
import HomePage from "../page";

export default async function UsersPage() {
    const session =  await getSessionToken();
  
    if(!session)
    return (
        <CreateUser/>
    );
  
    return (HomePage());
    
  }