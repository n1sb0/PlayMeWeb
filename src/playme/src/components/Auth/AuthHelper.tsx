import crypto from 'crypto';

const loginUser = async (email : string, password : string) => {
  try{
    const user = await getUserByEmail(email);

    if(!user){
      return {error: "email or password does not match our records"}
    }
  
    const matched = await validatePassword(user, password)
    if(!matched){
      return {error: "email or password does not match our records"}
    }
  
    return {user : {user}}
  }catch(error){
    return {error: "Something went wrong, please try again"}
  }
}

const getSalt = async () => {
  return (crypto.randomBytes(16)).toString('hex');
}

const getHashedPassword = async (password : string, salt : string) => {
  return crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex');
}

const validatePassword = async (user : any, inputPassword : string) =>{
  const inputHash = crypto
      .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
      .toString('hex');
  const passwordsMatch = user.hashed_password === inputHash;

  return passwordsMatch;
}

const getUserByEmail = async (email : string) => {
  const apiUrl = process.env.BASE_API_URL + `Users/GetUserByEmail/${email}`;
  const result = await fetch(apiUrl, { cache: "no-store" });
  
  const user = await result.json();
  return user as any;
};

const createNewUser = async (user: any) => {
  const salt = (await getSalt()).toString();
  const hashed_password = await getHashedPassword(user.hashed_password, salt);

  const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL + "Users/CreateUser";
  const result = await fetch(apiUrl, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: user.name ? user.name : user.email,
      lastname: user.lastname,
      email: user.email,
      hashed_password: hashed_password,
      salt: salt,
    }),
  }).catch((err) => {
    console.log(err);
  });

  console.log('reg result', result)
  return result;
};

const createUserFromProvider = async (profile : any) =>{  
  const result = await getUserByEmail(profile.email);

  if(result.status !== 200){
    const salt = (await getSalt()).toString();

    const user = {
      name: profile.given_name,
      email: profile.email,
      lastName: profile.family_name,
      hashed_password: salt,
      email_verified: profile.email_verified
    }
    const result = await createNewUser(user)
  }
}


export { loginUser, getSalt, getHashedPassword, getUserByEmail, createNewUser, createUserFromProvider };