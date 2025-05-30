import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Resource Not Found</h1>
      <p className="text-gray-600 mb-8">
        The resource you're looking for doesn't exist.
      </p>
      <Link
        to="/learning"
        className="text-purple-600 hover:text-purple-700 font-medium"
      >
        Go back to learning page
      </Link>
    </div>
  );
}
