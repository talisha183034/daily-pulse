import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";



const Plans = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const isButtonDisabled = !user;
    const userEmail = user?.email;

    // getting user form database
    const { data: userDB = {}, isLoading } = useQuery({
        queryKey: ["premiumUser"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${userEmail}`)
            return res.data;
        }
    })
    const { premiumUser } = userDB;


    // handle subscription
    const handleSubscription = (days, price) => {
        console.log(price);
        if (premiumUser === "true") {
            return Swal.fire({
                title: "Already a premium user",
                text: "You don't need to subscribe because you are already a premium user.",
                icon: "error"
            });
        }
        const subscriptionPeriod = days;
        const userStatus = "true";
        axiosSecure.put(`/user/${userEmail}`, { premiumUser: userStatus })
            .then(res => {
                const data1 = res.data;
                console.log("premium user", data1);
                if (data1.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Your are premium user now & subscribed for ${subscriptionPeriod} days`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    axiosSecure.put("/articles", { subscriptionPeriod })
                        .then(res => {
                            const data2 = res.data;
                            console.log("subscription period", data2);
                        })
                }

            })



    }
    // checking loading state
    // if (isLoading) {
    //     return <div className="flex bg-emerald-50 justify-center mt-28 mb-28 lg:mt-40 lg:mb-40">
    //         <progress className="progress w-56  h-2 lg:h-8 lg:w-80"></progress>
    //     </div>
    // }
    return (
        <>
            <div className="max-w-screen-xl mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="space-y-4 text-center">
                    <h3 className="text-2xl text-gray-400 font-bold sm:text-5xl">Premium Plans</h3>
                    <p className="text-gray-600 pb-10">
                        These are the list of all plans given by the newspaper company. <br />
                        People can choose different kind of plans as their reading needs.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
                    {/* first plan */}
                    <div className="bg-slate-100 divide-y divide-gray-200 rounded-2xl hover:shadow-md  hover:duration-500">
                        <div className="p-6 sm:px-8">
                            <h2 className="text-lg font-medium text-gray-900">
                                Starter
                                <span className="sr-only">Plan</span>
                            </h2>

                            <p className="mt-2 text-gray-700">
                                You can subscribe as a premium user for 10 days for free.
                            </p>

                            <p className="mt-2 sm:mt-4">
                                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                    Free
                                </strong>

                                <span className="text-sm font-medium text-gray-700">/10 days</span>
                            </p>

                            <button
                                onClick={() => handleSubscription(10, 0)}
                                disabled={isButtonDisabled}
                                className="mt-4 w-full block rounded border border-green-600 bg-green-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-green-500 sm:mt-6">
                                Get Started
                            </button>
                        </div>

                        <div className="p-6 sm:px-8">
                            <p className="text-lg font-medium text-gray-900 sm:text-xl">
                                What's included:
                            </p>

                            <ul className="mt-2 space-y-2 sm:mt-4">
                                <li className="flex items-center gap-1">

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-5 w-5 text-green-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>

                                    <span className="text-gray-700"> 10 users </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-5 w-5 text-green-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>

                                    <span className="text-gray-700"> 2GB of storage </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-5 w-5 text-green-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>

                                    <span className="text-gray-700"> Email support </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-5 w-5 text-red-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>

                                    <span className="text-gray-700"> Help center access </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-5 w-5 text-red-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>

                                    <span className="text-gray-700"> Phone support </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-5 w-5 text-red-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>

                                    <span className="text-gray-700"> Community access </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* second plan */}
                    <div className="bg-lime-100 divide-y divide-gray-200 rounded-2xl hover:shadow-md  hover:duration-500">
                        <div className="p-6 sm:px-8">
                            <h2 className="text-lg font-medium text-gray-900">
                                Pro
                                <span className="sr-only">Plan</span>
                            </h2>

                            <p className="mt-2 text-gray-700">
                                You can subscribe for 30 days to become a premium user for 30$ only.
                            </p>

                            <p className="mt-2 sm:mt-4">
                                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                    30$
                                </strong>

                                <span className="text-sm font-medium text-gray-700">/month</span>
                            </p>

                            <button
                                onClick={() => handleSubscription(30, 30)}
                                disabled={isButtonDisabled}
                                className="w-full mt-4 block rounded border border-green-600 bg-green-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-green-500 sm:mt-6">
                                Get Started
                            </button>
                        </div>

                        <div className="p-6 sm:px-8">
                            <p className="text-lg font-medium text-gray-900 sm:text-xl">
                                What's included:
                            </p>

                            <ul className="mt-2 space-y-2 sm:mt-4">
                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-5 w-5 text-green-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>

                                    <span className="text-gray-700"> 20 users </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-5 w-5 text-green-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>

                                    <span className="text-gray-700"> 5GB of storage </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-5 w-5 text-green-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>

                                    <span className="text-gray-700"> Email support </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-5 w-5 text-green-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>

                                    <span className="text-gray-700"> Help center access </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-5 w-5 text-red-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>

                                    <span className="text-gray-700"> Phone support </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-5 w-5 text-red-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>

                                    <span className="text-gray-700"> Community access </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* third plan */}
                    <div className="bg-green-200 divide-y divide-gray-200 rounded-2xl hover:shadow-md  hover:duration-500">
                        <div className="p-6 sm:px-8">
                            <h2 className="text-lg font-medium text-gray-900">
                                Enterprise
                                <span className="sr-only">Plan</span>
                            </h2>

                            <p className="mt-2 text-gray-700">
                                You can subscribe for 30 days to become a premium user for 100$ only.
                            </p>

                            <p className="mt-2 sm:mt-4">
                                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                    100$
                                </strong>

                                <span className="text-sm font-medium text-gray-700">/3 months</span>
                            </p>

                            <button
                                onClick={() => handleSubscription(90, 100)}
                                disabled={isButtonDisabled}
                                className="w-full mt-4 block rounded border border-green-600 bg-green-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-green-500 sm:mt-6">
                                Get Started
                            </button>
                        </div>

                        <div className="p-6 sm:px-8">
                            <p className="text-lg font-medium text-gray-900 sm:text-xl">
                                What's included:
                            </p>

                            <ul className="mt-2 space-y-2 sm:mt-4">
                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-5 w-5 text-green-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>

                                    <span className="text-gray-700"> 50 users </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-5 w-5 text-green-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>

                                    <span className="text-gray-700"> 20GB of storage </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-5 w-5 text-green-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>

                                    <span className="text-gray-700"> Email support </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-5 w-5 text-green-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>

                                    <span className="text-gray-700"> Help center access </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-5 w-5 text-green-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>

                                    <span className="text-gray-700"> Phone support </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-5 w-5 text-green-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>

                                    <span className="text-gray-700"> Community access </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Plans;