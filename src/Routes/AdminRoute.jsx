import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const AdminRoute = ({children}) => {
    const {user, Loading} = useAuth();
    
    const location = useLocation();
    if(Loading ){
        return <p>Loading....</p>
    }

    if(user?.id && user?.role === 'admin'){
        return children;
    }
    return <Navigate to='/login' state = {{from: location}} replace></Navigate>
};

export default AdminRoute;