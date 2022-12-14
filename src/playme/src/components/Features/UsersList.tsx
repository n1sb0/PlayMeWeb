import User from "./User";

const UserList = ({ users }: any) => {
  
    return (
      <div className="... grid h-56 grid-cols-3 content-center gap-4">
        {users?.map((user) => {
          return <User key={user.id} user={user} />;
        })}
      </div>
    );
  }
  
  export default UserList