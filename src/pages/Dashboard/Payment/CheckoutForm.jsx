import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState('');
    const {user} = useAuth();
    const [transactionId, setTransactionId] = useState('');
  const stripe = useStripe();
  const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();
    const navigate = useNavigate();
    const totalPrice = parseFloat(cart.reduce((total, item) => total + item.menu.price, 0).toFixed(2));
    console.log(totalPrice)
    useEffect(()=>{
        if(totalPrice>0){
            axiosSecure.post('/Payment/create-payment-intent',totalPrice,{
                headers: {
                    'Content-Type': 'application/json' // Add this header
                  }
            })
        .then(res =>{
            console.log("this res",res);
            setClientSecret(res.data.clientSecret);

        })
        }
    },[axiosSecure, totalPrice])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error); 
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    //confirm payment
    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret,{
        payment_method:{
            card: card,
            billing_details:{
                email: user.email,
                name: user.fullName,
            }
        }
    })

    if(confirmError){
        console.log('confirm error')
    }else{
        console.log('payment intent', paymentIntent);
        if(paymentIntent.status === 'succeeded'){
            console.log('transaction id', paymentIntent.id);
            setTransactionId(paymentIntent.id);

            //payment save in database
            const payment ={
                userId: user.id,
                totalAmount: totalPrice,
                transactionId: paymentIntent.id,
                //date: new Date(), //utc date convert. use Moment js to
                
                itemsId: cart.map(item => item.menuId),
            }
            const res = await axiosSecure.post('/Payment', payment);
            console.log('payment saved', res);
            refetch();
            if(res.data?.insertedCount === 'success'){
              await axiosSecure.delete(`/Card/${user?.id}`);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Payment is complete",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/');
            }
        }
    }

  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-sm btn-primary my-4"
        type="submit"
         disabled={!stripe || !clientSecret }
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && <p className="text-green-600">Transaction Id: {transactionId}</p>}
    </form>
  );
};

export default CheckoutForm;
