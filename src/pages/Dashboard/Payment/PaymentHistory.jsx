import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/Payment/userId?id=${user.id}`);
      return res.data;
    },
  });
  console.log(payments);
  return (
    <div>
      <h2 className="text-3xl">Total Payments: {payments.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Price</th>
              <th>Transaction Id</th>
              
            </tr>
          </thead>
          <tbody>
            {
                payments.map((payment, i) =><tr key={payment.id}>
                    <th>{i+1}</th>
                    <td>${payment.amount}</td>
                    <td>{payment.transactionId}</td>
                  </tr>)
            }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
