import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Plans from "../Home/Plans/Plans";
import PremiumArticles from "../PremiumArticles/PremiumArticles";

const Subscription = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const userEmail = user?.email;

    // getting user form database
    const { data: userDB = {}, isLoading } = useQuery({
        queryKey: ["premiumUser"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${userEmail}`)
            return res.data;
        }
    })
    const { name, premiumUser } = userDB;
    return (
        <div>

            {
                premiumUser === "true" && <div>
                    <h3 className="text-center pt-4 text-gray-400 text-4xl font-semibold">
                        {name}, you are a premium subscriber. <br /> You can view all the premium articles.
                    </h3>
                </div>
            }

            {
                premiumUser === "true" ?
                    <PremiumArticles></PremiumArticles>
                    : <Plans></Plans>
            }
        </div>
    );
};

export default Subscription;