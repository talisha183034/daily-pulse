import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Publishers = () => {
    const axiosPublic = useAxiosPublic();
    const { data: allPublisher = [], isLoading } = useQuery({
        queryKey: ["allPublishers"],
        queryFn: async () => {
            const res = await axiosPublic.get("/publishers")
            return res.data;
        }
    })
    // if (isLoading) {
    //     return <div className="flex bg-emerald-50 justify-center mt-28 mb-28 lg:mt-80 lg:mb-60">
    //         <progress className="progress w-56  h-2 lg:h-8 lg:w-80"></progress>
    //     </div>
    // }
    return (
        <section className="pb-6 text-gray-800">
            <div className="container p-4 mx-auto space-y-16 sm:p-10">
                <div className="space-y-4 text-center">
                    <h3 className="text-2xl font-bold text-gray-400 sm:text-5xl">All Publishers</h3>
                    <p className="text-gray-600">
                        These are the list of all of our publishers from gaza city. <br />
                        Many of them are dead but some are not in this world now.
                    </p>
                </div>
                <div className="grid w-full grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                    {
                        allPublisher?.map(item => <div key={item._id} className="space-y-4">
                            <img
                                className="object-cover h-56 w-56 mx-auto mb-4 bg-center rounded-lg bg-white"
                                src={item.publisherImage}
                            />
                            <div className="flex flex-col items-center">
                                <h4 className="text-xl font-semibold">{item.publisher}</h4>
                                <p className="text-sm text-gray-600">Publications</p>
                            </div>
                        </div>)
                    }

                </div>
            </div>
        </section>
    );
};

export default Publishers;