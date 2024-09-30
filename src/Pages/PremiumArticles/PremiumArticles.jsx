import { useQuery } from "@tanstack/react-query";
import SingleArticle from "../AllArticles/SingleArticle/SingleArticle";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PremiumArticles = () => {
    // hooks and states
    const axiosSecure = useAxiosSecure();

    // tanstackquery
    const { data: premiumArticles = [], isLoading } = useQuery({
        queryKey: ["premiumArticles"],
        queryFn: async () => {
            const res = await axiosSecure.get("/premiumArticles")
            return res.data;
        }
    })


    // checking loading state of articles
    if (isLoading) {
        return <div className="flex bg-emerald-50 justify-center mt-28 mb-28 lg:mt-80 lg:mb-60">
            <progress className="progress w-56  h-2 lg:h-8 lg:w-80"></progress>
        </div>
    }


    return (
        <>  
            {/* <div>
                <h3 className="text-center pt-4 text-gray-400 text-4xl font-semibold">All Premium Articles</h3>
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-10 pb-10">
                {
                    premiumArticles?.map(data =>
                        <SingleArticle
                            key={data._id}
                            data={data}
                        >
                        </SingleArticle>)
                }
            </div>
        </>
    );
};

export default PremiumArticles;