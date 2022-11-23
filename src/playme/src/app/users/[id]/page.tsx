// {next: {revalidate: 10}} will recall db every 10 sec (ISR)
async function getUser(userId: string) {  
    const res = await fetch(`http://127.0.0.1:8090/api/collections/notes/records/${userId}`, {next: {revalidate: 10}});

    const data = await res.json();
    return data;
}

export default async function UserPage({ params } : any) {
    //const note = await getUser(params.id);

    return (
        <div>
            UserPage:
            {/* <h1>notes/{note.id}</h1>
            <div className={styles.note}>
              <h3>{note.title}</h3>
              <h5>{note.content}</h5>
              <p>{note.created}</p>
            </div> */}
        </div>
    )
}