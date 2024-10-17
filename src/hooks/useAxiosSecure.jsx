import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5279/api'
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    // for requerst
    axiosSecure.interceptors.request.use((config)=>{
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, (error)=>{
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use((response)=>{
        return response;
    }, async(error)=>{
        const status = error.response.status;
        if(status=== 401 || status === 403){
            navigate('/login');
        }
        return Promise.reject(error);
    })
    return axiosSecure;

};

export default useAxiosSecure;