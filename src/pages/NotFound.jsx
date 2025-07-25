import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center p-6">
            <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
            <p className="text-xl mb-4">Sorry, the page you are looking for does not exist.</p>
            <Link
                to="/"
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                ⬅️ Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
