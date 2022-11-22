const getUser = async(email : any) => {

    const result = await fetch(process.env.BASE_API_URL + "Users",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
        })
    })

    const data = await result.json();
    return data as any;
}

export default async function HomePage(){
    const user = await getUser("pippo@gmail.com");

    return (
        <div>
            <h1>Home Page</h1>
            <p>Hi {user.email}</p>
        </div>
    )
}