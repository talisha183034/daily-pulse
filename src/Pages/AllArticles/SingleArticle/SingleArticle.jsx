import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const SingleArticle = ({ data, isBanner }) => {
    // states and hooks
    const axiosSecure = useAxiosSecure();
    const { _id, title, image, tag, description, publisher, publisherImage, views: dbViews, isPremium, subscriptionPeriod } = data;
    const { user, loading } = useAuth();
    // user email from firebase
    const userEmail = user?.email;

    // getting user from database
    const { data: userDB = {} } = useQuery({
        queryKey: ["userDB"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${userEmail}`)
            return res.data;
        }
    })
    const { premiumUser } = userDB;

    // Determine whether the button should be disabled
    const isButtonDisabled = !premiumUser && isPremium;

    // handle view on clicking read more
    const handleView = (id) => {
        const views = dbViews + 1;
        axiosSecure.put(`/articles/updateView/${id}`, { views })
            .then(res => {
                const data = res.data;
                console.log(data);
            })
    }

    return (
        <div className={`${isPremium ? 'bg-cyan-100' : 'bg-gray-100'} flex flex-col text-gray-700 rounded-md border-2 hover:shadow-xl  hover:duration-500 ${isBanner ? "lg:w-3/4" : "lg:w-[450px]"}  container mx-auto bg-clip-border`}>

            {/* article image */}
            <div className={`${isBanner ? " h-full w-full px-4" : "h-60"} mx-auto pt-4 rounded-md`}>
                <img
                    className={` ${isBanner ? "w-full" : "w-[400px] h-full"}  rounded-md`}
                    src={image}
                    alt="img-blur-shadow"
                    layout="fill"
                />
            </div>
            <div className="p-4 flex gap-3 items-center">

                {/* publisher photo */}
                <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                    <div className="avatar">
                        <div className="w-7">
                            <img src={publisherImage} />
                        </div>
                    </div>
                </div>

                {/* publisher & tags */}
                <div className="flex gap-3 items-center w-full">
                    <div>
                        <p className="font-sans text-base font-medium">{publisher}</p>
                    </div>
                    <div>
                        <p className="font-sans text-base font-medium">#{tag}</p>
                    </div>
                </div>

                {/* views */}
                <div className="flex items-center">
                    <FaEye></FaEye>
                    <p className="pl-1 font-sans text-base font-medium">{dbViews}</p>
                </div>
            </div>

            {/* title, description & subscription time */}
            <div className={`px-6 ${isBanner ? "h-32" : "h-32"}`}>
                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {title}
                </h5>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    {description}
                </p>               
                {
                    premiumUser === "true" && isPremium && <p className="block font-sans text-pink-600 text-lg antialiased font-medium leading-relaxed text-inherit">
                        Subscription period : {subscriptionPeriod} days
                    </p>
                }

            </div>

            {/* button area */}
            <div className="p-6">
                <Link to={`/articleDetails/${_id}`}>

                    <button
                        onClick={() => handleView(_id)}
                        disabled={isButtonDisabled}
                        className={`group w-full rounded-md relative inline-block overflow-hidden border ${isPremium ? "border-orange-600" : "border-green-600"}  px-8 py-3 focus:outline-none focus:ring`}>
                        <span className={`absolute inset-x-0 bottom-0 h-[2px] ${isPremium ? "bg-orange-600" : "bg-green-600"} transition-all group-hover:h-full group-green:bg-indigo-500`}></span>
                        <span className={`relative text-sm font-medium ${isPremium ? "text-orange-600" : "text-green-600"} transition-colors group-hover:text-white`}>
                            Read More
                        </span>
                    </button>

                </Link>

            </div>
        </div>
    );
};

export default SingleArticle;