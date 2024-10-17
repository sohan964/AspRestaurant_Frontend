import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://localhost:5279/api'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;