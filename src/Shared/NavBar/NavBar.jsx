import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { FaRegUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import useAdmin from "../../hooks/useAdmin";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { FaPowerOff } from "react-icons/fa6";
import logo from "../../../src/assets/logo.png";

const NavBar = () => {
    // states and hooks
    const axiosSecure = useAxiosSecure();
    const { user, logout, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    // email from firebase
    const userEmail = user?.email;

    // getting user form database
    const { data: userDB = {}, isLoading } = useQuery({
        queryKey: ["loggedUser"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${userEmail}`);
            return res.data;
        },
    });
    // destructuring user information
    const { name, email, image, premiumUser } = userDB;

    // logout
    const handleLogout = () => {
        logout().then((res) => {
            const user = res.user;
            console.log(user);
        });
    };

    // if loading true
    // if (isLoading || isAdminLoading || loading) {
    //     return <div className="flex justify-center">
    //         <progress className="progress w-56"></progress>
    //     </div>
    // }

    // common links
    const links = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/allArticles">Articles</NavLink>
            </li>
            {user && (
                <>
                    <li>
                        <NavLink to="/addArticles">Add Articles</NavLink>
                    </li>
                    <li>
                        <NavLink to="/myArticles">My Articles</NavLink>
                    </li>
                    {/* <li><NavLink to="/premiumArticles">Premium Articles</NavLink></li> */}
                </>
            )}
            <li>
                <NavLink to="/subscriptions">Subscription</NavLink>
            </li>
            {user && isAdmin && (
                <>
                    <li>
                        <NavLink to="/dashboard/adminHome">Dashboard</NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar py-0 px-4 bg-emerald-600">
            <div className="navbar-start">
                {/* drop down menu in image for small devices */}
                <div className="dropdown">
                    <label tabIndex={0} className="lg:hidden">
                        <img
                            className="w-[40%]"
                            src={logo}
                            alt="newspaper_portal"
                        />
                    </label>
                    <ul
                        id="link1"
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {links}
                    </ul>
                </div>
                {/* logo for medium and larger devices */}
                <Link to="/">
                    <img
                        src={logo}
                        alt="newspaper_portal"
                        className="hidden lg:flex ml-2 w-[90px] h-[90px]"
                    />
                </Link>
            </div>
            {/* links for medium and larger devices */}
            <div className="navbar-center hidden lg:flex">
                <ul
                    id="link2"
                    className="menu menu-horizontal px-1 gap-x-2 text-sm text-white"
                >
                    {links}
                </ul>
            </div>
            {/* login / user information using dropdown menu */}
            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-bottom dropdown-end z-10">
                        <label tabIndex={0} className="">
                            <div className="flex ">
                                {premiumUser === "true" && (
                                    <p className="text-amber-500 text-sm font-medium">
                                        Premium
                                    </p>
                                )}
                                <button>
                                    <img
                                        className="w-[40px] h-[40px] mr-2 rounded-full border-2 border-gray-400 hover:border-gray-700"
                                        src={image}
                                        alt="user_photo"
                                    />
                                </button>
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="bg-white dropdown-content mt-2 z-[1] w-[150px] p-1 rounded-md"
                        >
                            <Link to="/profile">
                                <li className="flex items-center gap-3 text-sm py-1.5 px-3 border-2 border-white hover:border-2 hover:rounded hover:border-black hover:transition-all hover:duration-200 hover:bg-gray-200 w-full font-semibold text-gray-600">
                                    <FaRegUser />
                                    Profile Info
                                </li>
                            </Link>
                            <li className="mt-2">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 px-3 border-2 border-white hover:border-2 hover:rounded hover:border-black hover:transition-all hover:duration-200 hover:bg-red-100 w-full py-1.5 font-semibold text-red-600 text-sm"
                                >
                                    <FaPowerOff /> Sign Out
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="px-6 mr-2 flex items-center gap-2 py-2 rounded-md bg-sky-700 text-white hover:bg-lime-500">
                                <FaSignInAlt></FaSignInAlt>
                                Login
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="px-6 flex items-center gap-2 py-2 rounded-md bg-orange-700 text-white hover:bg-lime-500">
                                <FaSignInAlt></FaSignInAlt>
                                Register
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default NavBar;
