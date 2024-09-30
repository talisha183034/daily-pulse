import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const { googleRegister, createUser } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const location = useLocation();
    const navigate = useNavigate();


    // google sign in
    const googleSignIn = () => {
        googleRegister()
            .then(result => {
                // getting user info
                const user = result.user;
                console.log("google user", user);
                const email = user?.email;
                const name = user?.displayName;
                const image = user?.photoURL;
                const userInfo = { name, email, image }
                // posting info in database
                axiosPublic.post("/users", userInfo)
                    .then(res => {
                        console.log("user in database", res.data);
                    })
                if (user.uid) {
                    Swal.fire({
                        title: "Logged in",
                        text: "Successfully logged in with google",
                        icon: "success"
                    });
                    navigate(location?.state ? location.state : "/");
                }
            })
    }


    // sign up with email & password
    const onSubmit = async (data) => {
        // hosting image in imagebb and getting url
        const imageFile = { image: data.image[0] };

        const imageResult = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        // const name = data.name;
        // const image = imageResult.data.data.display_url;
        const email = data.email;
        const password = data.password;
        createUser(email, password)
            .then(res => {
                const user = res.user;
                console.log("registration user", user);
                const name = data.name;
                const email = data.email; 
                const image = imageResult.data.data.display_url;
                const registrationInfo = { name, email, image }
                axiosPublic.post("/users", registrationInfo)
                    .then(res => {  
                        console.log("user in database", res.data);
                    })
                if (user.uid) {
                    Swal.fire({
                        title: "Signed up",
                        text: "Successfully signed up with email & password",
                        icon: "success"
                    });
                    reset({
                        name: "",
                        email: "",
                        password: ""
                    })
                    navigate(location?.state? location.state : "/")
                }
            })
            .catch(err => {
                console.log(err.error);
            })
    }


    return (
        <div className="w-full mt-16 mb-16 bg-gray-100 mx-auto max-w-lg p-4 border sm:p-8 text-gray-800">
            <h2 className="mb-3 text-3xl font-semibold text-center">Register a new account</h2>
            <p className="text-sm text-center text-gray-600">Already have an account?
                <Link to="/login" className="focus:underline hover:underline">Sign in here</Link>
            </p>
            <div className="my-6 space-y-4">
                <button onClick={googleSignIn} aria-label="Login with Google" type="button" className="flex items-center hover:bg-green-700 hover:text-white justify-center w-full p-4 space-x-4 border rounded-md focus:ri focus:ri border-gray-600 focus:ri">
                    <FaGoogle></FaGoogle>
                    <p>Login with Google</p>
                </button>

            </div>
            <div className="flex justify-center border-y-2 w-full my-4">
                <p className="px-3 py-3 text-gray-600">OR</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                    {/* name field */}
                    <div className="space-y-2">
                        <label className="block text-sm">Full name</label>
                        <input {...register("name", { required: true })} type="text" placeholder="enter your name here" className="w-full px-3 py-2 border rounded-md border-gray-300 text-gray-800 focus:border-emerald-600" />
                        {errors.name && <span className="text-red-600">Full name is required</span>}
                    </div>
                    {/* image field */}
                    <div className="space-y-2">
                        <label className="block text-sm">Profile picture</label>
                        <input {...register("image", { required: true })} type="file" placeholder="enter your image here" className="w-full px-3 py-2 border rounded-md border-gray-300 text-gray-800 focus:border-emerald-600" />
                        {errors.image && <span className="text-red-600">Image is required</span>}
                    </div>
                    {/* email field */}
                    <div className="space-y-2">
                        <label className="block text-sm">Email address</label>
                        <input {...register("email", { required: true })} type="email" placeholder="enter your email here" className="w-full px-3 py-2 border rounded-md border-gray-300 text-gray-800 focus:border-emerald-600" />
                        {errors.email && <span className="text-red-600">Email address is required</span>}
                    </div>
                    {/* password field */}
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-sm">Password</label>
                        </div>
                        <input {...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 20,
                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                        })} type="password" placeholder="enter your password here" className="w-full px-3 py-2 border rounded-md border-gray-300 text-gray-800 focus:border-emerald-600" />
                        {errors.password?.type === "required" && <span className="text-red-600">Password is required</span>}
                        {errors.password?.type === "minLength" && <span className="text-red-600">Password should be minimum 6 character</span>}
                        {errors.password?.type === "maxLength" && <span className="text-red-600">Password should be maximum 20 character</span>}
                        {errors.password?.type === "pattern" && <span className="text-red-600">Password should have one uppercase, one lowercase , one numeric value & one special character</span>}
                    </div>
                </div>
                <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-emerald-600 text-gray-50">Sign Up</button>
            </form>
        </div>
    );
};

export default Register;