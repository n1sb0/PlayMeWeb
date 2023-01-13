import crypto from 'crypto';

const loginUser = async (email : string, password : string) => {
  try{
    const apiUrl = process.env.BASE_API_URL + `Users/GetUserByEmail/${email}`;
    const result = await fetch(apiUrl, { cache: "no-store" });
    const user = await result.json();
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
  console.log(passwordsMatch)
  return passwordsMatch;
}

export { loginUser, getSalt, getHashedPassword };