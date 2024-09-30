import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const Login = () => {
    // states & hooks
    const { handleSubmit, register, formState: { errors } } = useForm();
    const { googleRegister, login } = useAuth();
    const axiosPublic = useAxiosPublic();
    const location = useLocation();
    const navigate = useNavigate();

    // google register
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

    // sign in with email and password
    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        login(email, password)
            .then(res => {
                const user = res.user;
                console.log(user);
                if (user.uid) {
                    Swal.fire({
                        title: "Logged in",
                        text: "Successfully logged in with email & password",
                        icon: "success"
                    });
                    navigate(location?.state ? location.state : "/");
                }
            })
            .catch(err => {
                console.log(err.error);
            })

    }

    return (
        <div className="w-full bg-gray-100 mx-auto max-w-lg border mt-16 mb-16 sm:p-8 text-gray-800">
            <h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
            <p className="text-sm text-center text-gray-600">Dont have account?
                <Link to="/register" className="focus:underline hover:underline">Sign up here</Link>
            </p>
            <div className="my-6 space-y-4">
                <button onClick={googleSignIn} aria-label="Login with Google" type="button" className="flex hover:bg-green-700 hover:text-white items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ri focus:ri border-gray-600 focus:ri">
                    <FaGoogle></FaGoogle>
                    <p>Login with Google</p>
                </button>

            </div>
            <div className="flex justify-center border-y-2 w-full my-4">
                <p className="px-3 py-3 text-gray-600">OR</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm">Email address</label>
                        <input {...register("email", { required: true })} type="email" placeholder="enter your email here" className="w-full px-3 py-2 border rounded-md border-gray-300 text-gray-800 focus:border-emerald-600" />
                        {errors.email && <span className="text-red-600">Email address is required</span>}
                    </div>
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
                <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-emerald-600 text-gray-50">Sign in</button>
            </form>
        </div>
    );
};

export default Login;