import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
// import Swal from "sweetalert2";

//formix need to see
const SignUp = () => {
  const {
    register,
    handleSubmit,
    //reset,
    formState: { errors },
  } = useForm();



   const Navigate = useNavigate();
//   console.log(errors);
   const { signUp, user } = useContext(AuthContext);
   if(user?.id) Navigate("/");
//   const axiosPublic = useAxiosPublic();
  const onSubmit = async(data) => {
     console.log(data);
    const res = await signUp(data);
    if(res?.data?.status === 200){
        Swal.fire({
            title: "Success",
            text: "Account Created",
            icon: "success",
            // showCancelButton: true,
            confirmButtonColor: "black",
            // cancelButtonColor: "#d33",
            confirmButtonText: "Login"
          }).then((result) => {
            if (result.isConfirmed) {
              Navigate("/login");
            }
          });
    }
    
    


    
  };

  return (
    <div className="hero  min-h-screen bg-base-200">
      <div className="hero-content w-1/2 flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">SignUp now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full text-center max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                placeholder="Full Name"
                name="fullName"
                {...register("fullName", { required: true })}
                className="input input-bordered"
              />
              {errors.fullName && <span>This field is required</span>}
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                {...register("email", { required: true, minLength: 6 })}
                className="input input-bordered"
              />
              {errors.email && <span>This field is required</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                {...register("password", { required: true })}
                className="input input-bordered"
                name="password"
              />
              {errors.password && <span>This field is required</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", { required: true })}
                className="input input-bordered"
                name="confirmPassword"
              />
              {errors.confirmPassword && <span>This field is required</span>}
            </div>

            <div className="form-control mt-6">
              <input
                className="btn btn-outline border-0 border-b-4"
                type="submit"
                value="SignUp"
              />
            </div>
          </form>
          <p className="mb-2">
            <small>
              Already Have an account? <Link to="/login">Login</Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
