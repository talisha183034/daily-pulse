import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import subscriptionImage from "../../../assets/offer-image.jpg"

const SubscriptionBanner = () => {
    // states and hooks
    const [showSubscription, setShowSubscription] = useState(true);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const userEmail = user?.email;

    // getting user form database
    const { data: premiumUserInformation = {}, isLoading } = useQuery({
        queryKey: ["premiumSubscriber"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${userEmail}`)
            return res.data;
        }
    })


    // premium user
    const { premiumUser } = premiumUserInformation;


    // query to stop showing element after 5 seconds
    const { refetch } = useQuery({
        queryKey: ["timer"],
        queryFn: async () => {
            const res = await new Promise((resolve) => setTimeout(resolve, 5000)); //wait for 5 seconds 
            setShowSubscription(false)
            return res.data;
        }
    })

    // useEffect to show element after 10 seconds
    useEffect(() => {
        const timerId = setTimeout(() => {
            refetch();
        }, 10000) //show element after 10 seconds
        return () => clearTimeout(timerId);
    }, [refetch])

    // useEffect to show banner only once in home page
    useEffect(() => {
        const bannerShown = localStorage.getItem("bannerShown");
        if (bannerShown) {
            setShowSubscription(false);
        }
        else {
            setShowSubscription(true);
            localStorage.setItem("bannerShown", "true")
        }
    }, [])

    // Reset local storage value upon page reload
    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.removeItem('bannerShown');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            localStorage.setItem('bannerShown', '')

        };
    }, []);


    // checking loading state
    // if (isLoading) {
    //     return <div className="flex bg-emerald-50 justify-center mt-28 mb-28 lg:mt-40 lg:mb-40">
    //         <progress className="progress w-56  h-2 lg:h-8 lg:w-80"></progress>
    //     </div>
    // }



    return (
        <div>
            {
                !premiumUser && showSubscription && <div className="fixed z-10 overflow-hidden inset-x-0 container top-80 left-[650px] p-4">
                    <div className="relative max-w-xl rounded-lg bg-gray-100 p-6 shadow-sm">
                        <button
                            type="button"
                            className="absolute -end-1 -top-1 rounded-full border border-gray-200 bg-white p-1 text-gray-400"
                        >
                            <span className="sr-only">Close</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <img
                                alt="Subscription-image"
                                src={subscriptionImage}
                                className="h-full w-full rounded-xl object-cover"
                            />

                            <div>
                                <h2 className="text-lg font-medium">
                                    Want to subscribe for premium articles?.
                                </h2>

                                <p className="mt-4 text-sm text-gray-500">
                                    You can view all our premium articles after subscription.
                                    Every day we launch new premium articles for our viewers.
                                </p>

                                <div className="mt-6 sm:text-right">
                                    <Link to="/plans">
                                        <button
                                            className="inline-block w-full rounded-lg bg-emerald-600 px-5 py-3 text-sm font-medium text-white"
                                        >
                                            More about subscriptions
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            }
        </div>
    );
};

export default SubscriptionBanner;