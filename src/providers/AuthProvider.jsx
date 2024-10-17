import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";




export const AuthContext = createContext();


const AuthProvider = ({children}) => {

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    const [token, setToken] = useState(localStorage.getItem('access-token'));


    useEffect(()=>{
        if(token){
            axiosPublic.get('/Account/user',{
                headers:{
                    authorization : `bearer ${localStorage.getItem('access-token')}`
                }
            })
            .then(res =>{
                if(res.status === 200){
                    setUser(res.data);
                    //console.log(res);
                    setLoading(false);
                }
            })
            .catch(error =>{
                console.log(error);
                setLoading(false);
            })

        }else setLoading(false);
    },[token, axiosPublic])

    const signUp = async(data)=>{
        setLoading(true);
        const res = await axiosPublic.post('/Account/signup',data);
        if(res?.data?.status === 200){
            return res;
        }

    }

    const signIn = async (data)=>{
        setLoading(true)
        const res = await axiosPublic.post('/Account/login',data)
        return res;
    }

    const logout = () =>{
        localStorage.removeItem('access-token')
        setToken(null);
        setUser([]);
    }
    
    

    const authInfo = {
        user,
        loading,
        signUp,
        signIn,
        token,
        setToken,
        setLoading,
        logout


    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;