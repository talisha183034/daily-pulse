import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateArticle = () => {
    // states & hooks
    const { register, handleSubmit, formState: { errors } } = useForm();
    const articleData = useLoaderData();
    const { _id, title, image, tag, publisher, publisherImage, description } = articleData;
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // get article data by tanstack query
    // const { data } = useQuery({
    //     queryKey: ["articleData"],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get(`/article/${_id}`);
    //         return res.data;
    //     }
    // })

    const onSubmit = async (formData) => {
        


        // // getting data
        const title = formData.title;
        const image = formData.image;
        const tag = formData.tag;
        const description = formData.description;
        const publisher = formData.publisher;
        const publisherImage = formData.publisherImage;



        // creating object to sent to database
        const doc = { title, image, tag, description, publisher, publisherImage }

        // sending data to database
        axiosSecure.put(`/updateArticle/${_id}`, doc)
            .then(res => {
                const data = res.data;
                console.log("article data", data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Article updated successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/myArticles");
                }
            })
    }



    return (
        <div className="container mx-auto">
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                        {/* Details area */}
                        <div className="lg:col-span-2 lg:py-12">
                            <p className="max-w-xl text-lg">
                                You can update your publications here and after being confirmed from admin you will be able to see them in all articles page.
                            </p>

                            <div className="mt-8">
                                <a href="" className="text-6xl font-bold text-green-600">
                                    Update Articles Here
                                </a>

                                <address className="mt-2 not-italic">
                                    Daily Pulse official page.
                                </address>
                            </div>
                        </div>

                        <div className="rounded-lg bg-gray-100 p-8 lg:col-span-3 lg:p-12">
                            {/* product form */}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                {/* Article Name & image */}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="p-2">Article name<sup className="text-red-600">*</sup></label>
                                        <input
                                            defaultValue={title}
                                            {...register("title", { required: true })}
                                            className="w-full border-2 rounded-lg border-gray-200 p-3 text-sm"
                                            placeholder="Article Name"
                                            type="text"
                                        />
                                        {errors.title && <span className="text-red-600">Article name is required</span>}
                                    </div>
                                    <div>
                                        <label className="p-2">Article image<sup className="text-red-600">*</sup></label>
                                        <input
                                            defaultValue={image}
                                            {...register("image", { required: true })}
                                            className="w-full bg-white border-2 rounded-lg border-gray-200 p-3 text-sm"
                                            placeholder="Article Image"
                                            type="text"
                                        />
                                        {errors.image && <span className="text-red-600">Article image is required</span>}
                                    </div>
                                </div>
                                {/* Publisher name & image */}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="p-2">Publisher name<sup className="text-red-600">*</sup></label>
                                        <select
                                            defaultValue={publisher}
                                            {...register("publisher", { required: true })}
                                            className="w-full border-2 rounded-lg border-gray-200 p-3 text-sm">
                                            <option value="">Select Publisher</option>
                                            <option value="Falastin">Falastin</option>
                                            <option value="Al-Ayyam">Al-Ayyam</option>
                                            <option value="Al-Hayat al-Jadida">Al-Hayat al-Jadida</option>
                                            <option value="Al-Hurriya">Al-Hurriya</option>
                                        </select>
                                        {errors.publisher && <span className="text-red-600">Publisher name is required</span>}
                                    </div>
                                    <div>
                                        <label className="p-2">Publisher image<sup className="text-red-600">*</sup></label>
                                        <input
                                            defaultValue={publisherImage}
                                            {...register("publisherImage", { required: true })}
                                            className="w-full bg-white border-2 rounded-lg border-gray-200 p-3 text-sm"
                                            placeholder="Publisher image"
                                            type="text"
                                        />
                                        {errors.publisherImage && <span className="text-red-600">Publisher image is required</span>}
                                    </div>
                                </div>
                                {/* tags & author email */}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="p-2">Article tags<sup className="text-red-600">*</sup></label>
                                        <select
                                            defaultValue={tag}
                                            {...register("tag", { required: true })}
                                            className="w-full border-2 rounded-lg border-gray-200 p-3 text-sm">
                                            <option value="">Select tags</option>
                                            <option value="gaza streets">gaza streets</option>
                                            <option value="gaza hospitals">gaza hospitals</option>
                                            <option value="gaza sky">gaza sky</option>
                                            <option value="gaza houses">gaza houses</option>
                                        </select>
                                        {errors.tag && <span className="text-red-600">Tags is required</span>}
                                    </div>
                                    <div>
                                        <label className="p-2">Author email<sup className="text-red-600">*</sup></label>
                                        <input
                                            readOnly
                                            defaultValue={user.email}
                                            {...register("email", { required: true })}
                                            className="w-full border-2 rounded-lg border-gray-200 p-3 text-sm"
                                            placeholder="Author email"
                                            type="text"
                                        />
                                    </div>
                                </div>

                                {/* Description Area */}
                                <div>
                                    <label className="p-2">Article description<sup className="text-red-600">*</sup></label>
                                    <textarea
                                        defaultValue={description}
                                        {...register("description", { required: true })}
                                        className="w-full border-2 rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="Article description"
                                        type="text"
                                    />
                                    {errors.description && <span className="text-red-600">Article description is required</span>}
                                </div>

                                {/* submit button */}
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="inline-block w-full rounded-lg bg-green-600 px-5 py-3 font-medium text-white sm:w-auto"
                                    >
                                        Update Article
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UpdateArticle;