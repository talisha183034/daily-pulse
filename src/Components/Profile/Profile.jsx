import { Avatar, Card } from "keep-react";
import { FacebookLogo, LinkedinLogo, GithubLogo } from "phosphor-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";



const Profile = () => {
    const [imageBlob, setImageBlob] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const userEmail = user?.email;

    // getting user form database
    const { data: loggedUser = {}, isLoading, refetch } = useQuery({
        queryKey: ["loggedUserInfo"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${userEmail}`)
            return res.data;
        }
    })
    const { name, email, image } = loggedUser;


    const onSubmit = (formData) => {

        // // getting data
        const name = formData.name;
        const image = formData.image;
        const email = formData.email;

        // creating object to sent to database
        const doc = { name, image, email }

        // sending data to database
        axiosSecure.put(`/updateUser/${userEmail}`, doc)
            .then(res => {
                const data = res.data;
                console.log("updated user data", data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Profile updated successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
    }
    // checking loading state of articles
    if (isLoading) {
        return <div className="flex bg-emerald-50 justify-center mt-28 mb-28 lg:mt-80 lg:mb-60">
            <progress className="progress w-56  h-2 lg:h-8 lg:w-80"></progress>
        </div>
    }

    return (
        <div className="flex flex-col lg:flex-row justify-center gap-10 px-10 py-32">
            {/* user info */}
            <Card className="max-w-[250px] mx-auto sm:mx-0 p-6">
                <Card.Container className="flex items-center justify-center">
                    <Avatar
                        shape="circle"
                        img={image}
                        statusPosition="bottom-right"
                        size="2xl"
                    />
                </Card.Container>
                <Card.Container className="text-center">
                    <Card.Title className="text-body-5 font-semibold text-metal-800 md:text-body-4">
                        {name}
                    </Card.Title>
                    <Card.Title className="!text-body-6 font-normal text-metal-400 md:text-body-5">Senior Journalist</Card.Title>
                    <Card.Title className="!text-body-6 font-normal text-metal-400 md:text-body-5">{email}</Card.Title>
                </Card.Container>
                <Card.Container className="circled mx-auto flex max-w-[220px] items-center justify-center divide-x divide-metal-200 rounded-md border border-metal-200 p-1 md:p-2">
                    <Card.Link
                        className="flex items-center justify-center px-3 py-1"
                        icon={<GithubLogo size={24} color="#0072b1" weight="fill" />}
                    />
                    <Card.Link
                        className="flex items-center justify-center px-3 py-1"
                        icon={<FacebookLogo size={24} color="#0C63D4" weight="fill" />}
                    />
                    <Card.Link
                        className="flex items-center justify-center px-3 py-1"
                        icon={<LinkedinLogo size={24} color="#0C8BD9" weight="fill" />}
                    />
                </Card.Container>
            </Card>

            {/* user update area */}
            <div>
                <div className="rounded-lg bg-gray-100 p-8 lg:col-span-3 lg:p-12">
                    {/* user update form form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                            {/* user name */}
                            <div>
                                <label className="p-2">User name<sup className="text-red-600">*</sup></label>
                                <input
                                    defaultValue={name}
                                    {...register("name", { required: true })}
                                    className="w-full border-2 rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="User name"
                                    type="text"
                                />
                                {errors.title && <span className="text-red-600">User name is required</span>}
                            </div>
                            {/* user email */}
                            <div>
                                <label className="p-2">User email<sup className="text-red-600">*</sup></label>
                                <input
                                    defaultValue={email}
                                    {...register("email", { required: true })}
                                    className="w-full border-2 rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="User email"
                                    type="text"
                                />
                                {errors.email && <span className="text-red-600">User email is required</span>}
                            </div>

                        </div>

                        {/* user image */}
                        <div>
                            <label className="p-2">User image<sup className="text-red-600">*</sup></label>
                            <input
                                defaultValue={image}
                                {...register("image", { required: true })}
                                className="w-full bg-white border-2 rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="User image"
                                type="text"
                            />
                            {errors.image && <span className="text-red-600">User image is required</span>}
                        </div>


                        {/* submit button */}
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="inline-block w-full rounded-lg bg-green-600 px-5 py-3 font-medium text-white sm:w-auto"
                            >
                                Update User
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;