import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useCart from "../../../hooks/useCart";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  console.log(user);
  const handleLogout = async () => {
    await logout();
  };

  const [cart] = useCart();

  const NavOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Menu</Link>
      </li>
      <li>
        <Link to="/order/salad">Order</Link>
      </li>
      <li>
        {user?.id ? user?.role==='admin'? <Link to="/dashboard/adminHome">Dashboard</Link> : <Link to="/dashboard/userHome">Dashboard</Link> : <></>}
      </li>
      <li>
        <Link to="/dashboard/cart">
          <button className="">
            <div className="badge badge-secondary">
              <FaShoppingCart></FaShoppingCart>+{cart.length}
            </div>
          </button>
        </Link>
      </li>
      <li>
        {user.id ? (
          <button onClick={handleLogout}>Logout</button>
          
        ) : (
          <Link to="/login">Login</Link>
        )}
      </li>
      <li>
      {user.id && <div className="">{user.fullName}</div>}
      </li>

    </>
  );

  return (
    <div className="navbar fixed text-black lg:text-white bg-opacity-30 z-10 max-w-screen-2xl bg-black">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {NavOptions}
            
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Payala</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{NavOptions}</ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Home</a>
      </div>
    </div>
  );
};

export default NavBar;
