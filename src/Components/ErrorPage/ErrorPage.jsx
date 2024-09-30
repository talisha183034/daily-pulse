import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="grid h-screen px-4 bg-white place-content-center">
            <div className="text-center">
                <img className="w-3/4 mx-auto" src="https://i.ibb.co/XL6BQgL/Error-404-Page-Not-Found.png" alt="404_image" />
                <p className="mt-4 text-gray-500">We cant find that page.</p>
                <p 
                className="inline-block px-5 py-3 mt-6 text-sm font-medium text-black border hover:text-white border-black rounded hover:bg-purple-400 focus:outline-none focus:ring">
                    <Link to="/">Back to home</Link>
                </p>
            </div>
        </div>
    );
};

export default ErrorPage;