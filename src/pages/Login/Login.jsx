

import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  //console.log(from);
  

  const {signIn, setToken, user} = useContext(AuthContext);

  const handleLogin = async(e) => {
    e.preventDefault();
    const form = e.target;
    const data={
      email : form.email.value,
      password : form.password.value,
    }

    const res = await signIn(data);
    if(res.status === 200){
      localStorage.setItem("access-token",res.data);
      setToken(res.data);
      toast.success("Welcome");
      
      console.log(from)
      navigate(from, {replace: true});
    }
  };
  if(user?.id) navigate(from,{replace: true});

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content w-1/2 flex-col md:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full text-center max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              <div className="form-control mt-6">
                <input
                  className="btn btn-outline border-0 border-b-4"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>

            <p className="my-2">
              <small>
                New Here? <Link to="/signup">Create an account</Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
