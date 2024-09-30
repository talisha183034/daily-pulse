import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";

const AdminRoute = ({ children }) => {
    // states and hooks
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    // if both loading then show progress bar
    if (loading || isAdminLoading) {
        return <div className="flex justify-center mt-28 mb-28 lg:mt-80 lg:mb-60">
            <progress className="progress w-56  h-2 lg:h-8 lg:w-80"></progress>
        </div>
    }

    // if user and admin found show the elements
    if (user && isAdmin) {
        return children;
    }

    return <Navigate state={location?.pathname} to="/"></Navigate>
};

export default AdminRoute;