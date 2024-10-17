import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const FoodCard = ({ item }) => {
  const { name, image, price, recipe } = item;
  //console.log(item);
  const location = useLocation();
  const {user} = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  const handleAddToCart = food =>{
    //console.log("cart",food)
    
    if(user && user?.id){
      console.log(food, user);
      const cartItem = {
        menuId: food.id,
        userId: user.id
        
      }
      axiosSecure.post('/card', cartItem)
      .then(res =>{
        if(res.status === 200){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} added to your cart`,
            showConfirmButton: false,
            timer: 1500
          });
          refetch();
        }
      })
    }
    else{
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', {state: {from: location}});
        }
      });
    }
   }
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt={name} />
      </figure>
      <p className="bg-slate-900 text-white absolute right-0 mr-4 mt-4 px-2">${price}</p>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title ">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button onClick={()=> handleAddToCart(item)}
          className="btn btn-outline border-0  text-orange-400 bg-slate-200 border-b-4">Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
