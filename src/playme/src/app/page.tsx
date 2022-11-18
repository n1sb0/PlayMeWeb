async function getNote() {  
    const apiUrl = "http://api-server:5000/api/WeatherForecast/GetUsers";
    const res = await fetch(apiUrl, { cache: 'no-store' });
    const data = await res.json();
    
    console.log(apiUrl);
    return data as any;
}

export default async function HomePage(){
    const notes = await getNote();
    console.log("b",notes);  

    return (
        <div>
            <h1>Home Page</h1>
            <p>Some content </p>
            <p>Title: {notes.title}</p>
        </div>
    )
}