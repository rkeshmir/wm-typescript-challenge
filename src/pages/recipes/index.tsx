import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Recipe } from "../../types";
import { RecipeCard } from "../../components/recipe-card";

const Recipes = () => {
  const pageSize = 8;
  const { page } = useParams();
  const navigate = useNavigate();
  const [cocktails, setCocktails] = useState<Recipe[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const isCurrentPage = (pageNumber: number) =>
    pageNumber === parseInt(page || "0", 10);
  const shiftPage = (dir: 1 | -1) => {
    const dest = parseInt(page || "0", 10) + dir;
    if (dest < 1 || dest > pageCount) return;
    navigate(`/recipes/${dest}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/recipes/all?${new URLSearchParams({
          limit: pageSize.toString(),
          offset: ((parseInt(page || "0", 10) - 1) * 8).toString(),
        })}`
      );
      return response.json();
    };
    fetchData().then((res: { data: Recipe[]; total: number }) => {
      setCocktails(res.data);
      setPageCount(Math.ceil(res.total / pageSize));
    });
  }, [page]);
  return (
    <main className="flex h-full flex-col">
      <nav
        className="mb-2"
        aria-label="Page navigation"
        data-testid="page-navigation"
      >
        <ul className="inline-flex -space-x-px">
          <li>
            <button
              onClick={() => shiftPage(-1)}
              type="button"
              data-testid="previous-page"
              className="ml-0 w-24 rounded-l-lg border border-gray-300 bg-white py-2 px-3 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>
          </li>

          {Array.from({ length: pageCount }, (_, i) => i + 1).map(
            (pageNumber) => (
              <li
                className="hidden md:block"
                key={pageNumber}
                data-testid={`page-${pageNumber}${
                  isCurrentPage(pageNumber) ? "-current" : ""
                }`}
              >
                <button
                  type="button"
                  aria-current={isCurrentPage(pageNumber) ? "page" : undefined}
                  className={`border border-gray-300 py-2 px-3 dark:border-gray-700${
                    isCurrentPage(pageNumber)
                      ? " bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white"
                      : " bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                  onClick={() => navigate(`/recipes/${pageNumber}`)}
                >
                  {pageNumber}
                </button>
              </li>
            )
          )}
          <li className="md:hidden">
            <input
              data-testid="page-navigation-input"
              className="h-full border border-gray-300 py-2 px-3"
              value={page}
              min={0}
              max={pageCount}
              type="number"
              onChange={(e) => {
                const { value } = e.target;
                const targetPage = parseInt(value, 10);
                if (targetPage > 0 && targetPage <= pageCount)
                  navigate(`/recipes/${value}`);
              }}
            />
          </li>
          <li>
            <button
              onClick={() => shiftPage(1)}
              type="button"
              data-testid="next-page"
              className="w-24 rounded-r-lg border border-gray-300 bg-white py-2 px-3 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      <div className="grid gap-2 overflow-y-auto overflow-y-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {cocktails?.map((cocktail) => (
          <RecipeCard key={cocktail.name} cocktail={cocktail} />
        ))}
      </div>
    </main>
  );
};

export default Recipes;
