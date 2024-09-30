import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const AddPublishers = () => {

    // states & hooks
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();


    const onSubmit = async (formData) => {
        // hosting image in imagebb and getting url
        const publisherImageFile = { image: formData.publisherImage[0] };

        // publisher image hosting
        const result = await axiosPublic.post(image_hosting_api, publisherImageFile, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        // image urls
        const publisherImageBB = result.data.data.display_url;

        // // getting data
        const publisher = formData.publisher;
        const publisherImage = publisherImageBB;
        const email = formData.email;



        // creating object to sent to database
        const doc = { publisher, publisherImage, email }

        // sending data to database
        axiosSecure.post("/publishers", doc)
            .then(res => {
                const data = res.data;
                console.log("publisher data", data);
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${publisher} added as publisher`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset({
                        publisher: "",
                        publisherImage: null,
                        email: "",
                    })
                }
            })
    }

    return (
        <div className="container mx-auto">
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-5 md:py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                        {/* Details area */}
                        <div className="lg:col-span-2 lg:py-12">
                            <p className="max-w-xl text-lg">
                                Add publishers here for your website.
                            </p>

                            <div className="mt-8">
                                <a href="" className="text-6xl font-bold text-green-600">
                                    Add Publishers Here
                                </a>

                                <address className="mt-2 not-italic">
                                    Daily Pulse official page.
                                </address>
                            </div>
                        </div>

                        <div className="rounded-lg bg-gray-100 p-8 lg:col-span-3 lg:p-12">
                            {/* product form */}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                {/* Publishers name */}
                                <div>
                                    <label className="p-2">Publisher name<sup className="text-red-600">*</sup></label>
                                    <input
                                        {...register("publisher", { required: true })}
                                        className="w-full border-2 rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="Publisher name"
                                        type="text"
                                    />
                                    {errors.title && <span className="text-red-600">Publisher name is required</span>}
                                </div>

                                {/* Publisher image */}
                                <div>
                                    <label className="p-2">Publisher image<sup className="text-red-600">*</sup></label>
                                    <input
                                        {...register("publisherImage", { required: true })}
                                        className="w-full bg-white border-2 rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="Publisher image"
                                        type="file"
                                    />
                                    {errors.image && <span className="text-red-600">Publisher image is required</span>}
                                </div>

                                {/* publisher email */}

                                <div>
                                    <label className="p-2">Publisher email<sup className="text-red-600">*</sup></label>
                                    <input
                                        {...register("email", { required: true })}
                                        className="w-full border-2 rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="Publisher email"
                                        type="text"
                                    />
                                    {errors.email && <span className="text-red-600">Publisher email is required</span>}
                                </div>



                                {/* submit button */}
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="inline-block w-full rounded-lg bg-green-600 px-5 py-3 font-medium text-white sm:w-auto"
                                    >
                                        Add Publisher
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

export default AddPublishers;