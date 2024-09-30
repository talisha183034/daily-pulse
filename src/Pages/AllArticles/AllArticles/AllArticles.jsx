import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SingleArticle from "../SingleArticle/SingleArticle";
import { FaSearch } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";


const AllArticles = () => {
    // states and hooks
    const axiosPublic = useAxiosPublic();
    const [articlesData, setArticlesData] = useState([]);
    const { register, handleSubmit, reset } = useForm();


    // tanstackquery
    const { data, isLoading } = useQuery({
        queryKey: ["article"],
        queryFn: async () => {
            const res = await axiosPublic.get("/approvedArticles");
            return res.data;
        },
    })

    // useEffect to set data in a state
    useEffect(() => {
        setArticlesData(data);
    }, [data])

    // handle search
    const onSubmit = (formData) => {
        const search = formData.search;
    }


    // checking loading state of articles
    if (isLoading) {
        return <div className="flex bg-emerald-50 justify-center mt-28 mb-28 lg:mt-80 lg:mb-60">
            <progress className="progress w-56  h-2 lg:h-8 lg:w-80"></progress>
        </div>
    }

    return (
        <>
            <div>
                <h3 className="text-center pt-4 text-gray-400 text-4xl font-semibold">All Articles</h3>
            </div>
            {/* tabs */}
            {/* <div role="tablist" className="tabs tabs-lifted">
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 1" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 1</div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 2" checked />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 2</div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 3" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 3</div>
            </div> */}

            {/* search bar */}
            <div className="relative w-[80%] md:w-2/3 lg:w-1/3 mx-auto pt-10">
                <label htmlFor="Search" className="sr-only"> Search </label>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register("search", { required: true })}
                        type="text"
                        placeholder="Search for..."
                        className="w-full p-3 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
                    />

                    <span className="absolute inset-y-0 end-0 grid w-10 place-content-center pt-10">
                        <button type="submit" className="text-gray-600 hover:text-gray-700">
                            <span className="sr-only">Search</span>
                            <FaSearch></FaSearch>
                        </button>
                    </span>
                </form>
            </div>
            {/* articles data */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-10 pb-10">
                {
                    articlesData?.map(data => <SingleArticle
                        key={data._id}
                        data={data}
                    >
                    </SingleArticle>)
                }
            </div>
        </>
    );
};

export default AllArticles;