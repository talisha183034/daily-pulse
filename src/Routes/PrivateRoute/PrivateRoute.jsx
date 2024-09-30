import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    // hooks and states
    const { user, loading } = useAuth();
    const location = useLocation();

    // if loading true
    if (loading) {
        return <div className="flex justify-center mt-28 mb-28 lg:mt-80 lg:mb-60">
            <progress className="progress w-56  h-2 lg:h-8 lg:w-80"></progress>
        </div>
    }

    // if user found then return the element
    if (user) {
        return children;
    }
    return <Navigate state={location?.pathname} to="/login"></Navigate>
};

export default PrivateRoute;