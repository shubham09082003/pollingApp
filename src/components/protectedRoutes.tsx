import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export const ProtectedRoutes = ({children} : {children : React.ReactNode}) => {
    const {session , isLoading} = UserAuth();

    if(isLoading){
        return <div>Loading...</div>
    }

    if(!session){
        return <Navigate to="/" />
    }
    
    return <>{children}</>;
}
