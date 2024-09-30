import { useLoaderData } from "react-router-dom";

const ArticleDetails = () => {
    // states and hooks
    const articleDetails = useLoaderData();
    const { _id, title, image, tag, description, publisher, publisherImage, views, isPremium } = articleDetails;


    return (
        <section className="overflow-hidden h-[550px] m-10 bg-green-50 sm:grid sm:grid-cols-2" >
            <div className="p-8 md:p-12 lg:px-16 lg:py-24">
                <div className="mx-auto max-w-xl ltr:sm:text-left rtl:sm:text-right">
                    <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                        {title}
                    </h2>
                    <div className="pt-2 flex gap-3 items-center">

                        {/* publisher photo */}
                        <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                            <div className="avatar">
                                <div className="w-7">
                                    <img src={publisherImage} />
                                </div>
                            </div>
                        </div>

                        {/* publisher & tags */}
                        <div className="flex gap-3 items-center w-[300px]">
                            <div>
                                <p className="font-sans text-base font-medium">{publisher}</p>
                            </div>
                            <div>
                                <p className="font-sans text-base font-medium">#{tag}</p>
                            </div>
                        </div>
                    </div>
                    <p className="hidden text-gray-500 md:mt-4 md:block">
                        {description}
                    </p>

                    <div className="mt-4 md:mt-8">
                        <a className={`inline-block rounded ${isPremium ? "bg-orange-600" : "bg-emerald-600"} px-12 py-3 text-sm font-medium text-white transition ${isPremium ? "hover:bg-orange-700" : "hover:bg-emerald-700"} focus:outline-none focus:ring focus:ring-yellow-400`}>
                            Want to know more?
                        </a>
                    </div>
                </div>
            </div>

            <img
                alt="news"
                src={image}
                className="h-56 w-full object-cover sm:h-full"
            />
        </section>
    );
};

export default ArticleDetails;