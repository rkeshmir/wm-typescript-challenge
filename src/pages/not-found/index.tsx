import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <main className="flex h-full flex-col">
      <div className="flex justify-center overflow-y-auto overflow-y-auto">
        <div className="rounded border-2 border-red-700 bg-radial p-4 text-white dark:border-gray-400 dark:bg-gray-600">
          Page not found!
          <button
            className="ml-1 underline"
            onClick={() => navigate("/")}
            type="button"
          >
            Click here to visit the homepage.
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
