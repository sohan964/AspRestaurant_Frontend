import { Rating } from "@smastrom/react-rating";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddReview = () => {
  const [rating, setRating] = useState(0);
  const { user } = useAuth();
  console.log(rating);
  const axiosSecure = useAxiosSecure();
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const form = e.target;
    
    //const star= form.rating.value;
    
    const data ={
        Name: form.name.value,
        Details:form.comment.value,
        Rating:rating
    }
    
    const res = await axiosSecure.post('/Review', data);
    if(res.status === 200){
        form.reset();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Review Added",
            showConfirmButton: false,
            timer: 1500
          });
    }
    

  }
  return (
    <div className="card bg-base-100 w-full  max-w-sm shrink-0 shadow-2xl">
        <h3 className="text-2xl">Give Review</h3>
      <form className="card-body" onSubmit={handleSubmit}>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
        <input
          type="text"
          value={user.fullName}
          disabled
          placeholder="name"
          name="name"
          className="input input-bordered w-full max-w-xs"
        />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Comment</span>
          </label>
        <textarea
          className="textarea textarea-bordered"
          placeholder="Comment"
          name="comment"
        ></textarea>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Rating</span>
          </label>
        <Rating
          style={{ maxWidth: 180 }}
          value={rating}
          onChange={setRating}
          name="rating"
          isRequired
        />
        </div>

        <input className="btn" type="submit" value="Add" />
      </form>
    </div>
  );
};

export default AddReview;
