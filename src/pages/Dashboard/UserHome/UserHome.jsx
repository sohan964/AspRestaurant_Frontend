import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src=""
          alt={user.fullName}
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">Name: {user.fullName}</h2>
        <p>Email: {user.email}</p>
       <p>Role: {user.role}</p>
      </div>
    </div>
  );
};

export default UserHome;
