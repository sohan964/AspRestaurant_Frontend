import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {data:cart = [], refetch} = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/card/userId?id=${user?.id}`)
            return res.data;
        }
    })
    
    return [cart, refetch];
};

export default useCart;