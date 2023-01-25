import UserCard from "./UserCard";


const UserList = ({ users }: any) => {
  
    return (
      <div className="... grid h-56 grid-cols-3 content-center gap-4 m-6">
        {users?.map((user : any) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </div>
    );
  }
  
  export default UserList