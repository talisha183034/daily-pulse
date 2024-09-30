import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
    FaAddressBook,
    FaBook,
    FaHome,
    FaSignOutAlt,
    FaUserPlus,
    FaUsers,
} from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { RxDashboard } from "react-icons/rx";

const Dash = () => {
    // states and hooks
    const axiosSecure = useAxiosSecure();
    const { user, logout } = useAuth();

    const userEmail = user?.email;

    // getting user form database
    const { data: userDB = {} } = useQuery({
        queryKey: ["dashboardUser"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${userEmail}`);
            return res.data;
        },
    });
    const { name, image } = userDB;
    const links = (
        <>
            <li>
                <NavLink to="adminHome">
                    <RxDashboard />
                    Dashboard
                </NavLink>
            </li>
            <li>
                <NavLink to="pendingArticles">
                    <FaBook />
                    All Articles
                </NavLink>
            </li>
            <li>
                <NavLink to="users">
                    <FaUsers />
                    All Users
                </NavLink>
            </li>
            <li>
                <NavLink to="publishers">
                    <FaAddressBook />
                    All Publishers
                </NavLink>
            </li>
            <li>
                <NavLink to="addPublishers">
                    <FaUserPlus />
                    Add Publisher
                </NavLink>
            </li>
            <li>
                <NavLink to="/">
                    <FaHome />
                    Home
                </NavLink>
            </li>
        </>
    );

    const linksForMobile = (
        <>
            <li>
                <NavLink to="adminHome">
                    <RxDashboard />
                </NavLink>
            </li>
            <li>
                <NavLink to="pendingArticles">
                    <FaBook />
                </NavLink>
            </li>
            <li>
                <NavLink to="users">
                    <FaUsers />
                </NavLink>
            </li>
            <li>
                <NavLink to="publishers">
                    <FaAddressBook />
                </NavLink>
            </li>
            <li>
                <NavLink to="addPublishers">
                    <FaUserPlus />
                </NavLink>
            </li>
            <li>
                <NavLink to="/">
                    <FaHome />
                </NavLink>
            </li>
        </>
    );
    return (
        <div className="relative container mx-auto">
            <div className="flex">
                {/* dashboard sidebar */}
                <div className="hidden lg:flex">
                    <div className="min-h-screen p-3 space-y-2 w-60 bg-green-200 text-gray-800">
                        <div className="flex items-center p-2 space-x-4">
                            <img
                                src={image}
                                alt="user_photo"
                                className="w-12 h-12 rounded-full bg-gray-500"
                            />
                            <div>
                                <h2 className="text-lg font-semibold">
                                    {name}
                                </h2>
                                <span className="flex items-center space-x-1">
                                    <Link
                                        to="/profile"
                                        className="text-xs hover:underline text-gray-600"
                                    >
                                        View profile
                                    </Link>
                                </span>
                            </div>
                        </div>
                        <div className="divide-y divide-gray-300">
                            <ul
                                id="link1"
                                className="menu menu-vertical px-1 gap-2 text-gray-500"
                            >
                                {links}
                            </ul>
                            <ul className="pt-4 pb-2 space-y-1 text-sm">
                                <li>
                                    <button
                                        onClick={() => logout()}
                                        rel="noopener noreferrer"
                                        className="flex items-center p-2 space-x-3 rounded-md"
                                    >
                                        <FaSignOutAlt></FaSignOutAlt>
                                        <span>Logout</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* dashboard content */}
                <div
                    style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                    className="flex-1 bg-green-50 min-h-screen p-2 md:p-8 lg:p-12 lg:mb-0"
                >
                    <Outlet></Outlet>
                </div>
            </div>
            {/* for medium devices */}
            <div className="hidden md:flex lg:hidden absolute bottom-0 bg-green-200">
                <ul
                    id="link1"
                    className="menu menu-horizontal px-1 gap-2 text-gray-500"
                >
                    {links}
                </ul>
            </div>
            {/* for small devices */}
            <div className="flex md:hidden w-full bottom-0 sticky bg-green-200">
                <ul
                    id="link1"
                    className="menu menu-horizontal text-[22.5px] px-1 gap-2 text-gray-500"
                >
                    {linksForMobile}
                </ul>
            </div>
        </div>
    );
};

export default Dash;
