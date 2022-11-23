import Link from "next/link";

const getUsers = async() => {
    const apiUrl = "http://api-server:5000/api/Users/GetUsers";
    const result = await fetch(apiUrl, { cache: 'no-store' });

    const data = await result.json();
    return data as any;
}

export default async function UsersPage(){
    const users = await getUsers();
    console.log(users);

    return (
        <div>
            <h1>Users Page</h1>
            <div>
                {users?.map((user) =>{
                    return <User key={user.id} user={user}/>
                })}
            </div>
        </div>
    )
}

function User({user} : any){
    const {id, email, name, lastname, password} = user || {};
    console.log("User",user);
    return (
        <Link href={`/users/${id}`}>
            <div>
                <h2>Email: {email}</h2>
                <p>Name: {name}</p>
                <p>Lastname: {lastname}</p>
            </div>
        </Link>
    );
}