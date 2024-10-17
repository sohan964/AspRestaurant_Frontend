import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BuyingHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/Payment/allitems/userId?id=${user.id}`);
      return res.data;
    },
  });
  console.log(payments);
  return (
    <div>
      <h2 className="text-3xl">Total Buy: {payments.length}</h2>
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          #
        </th>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
       
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      
        {
            payments.map((payment, i) => <tr key={payment.id}>
            <th>
              {i+1}
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={payment?.menu?.image}
                      alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{payment?.menu?.name}</div>
                  <div className="text-sm opacity-50">Category: {payment?.menu?.categoryId}</div>
                </div>
              </div>
            </td>
            <td>
              {payment?.menu?.recipe}
              </td>
            <td>{payment?.menu?.price}</td>
            
            </tr>)
        }
     
      
    </tbody>
   
  </table>
</div>
    </div>
  );
};

export default BuyingHistory;
