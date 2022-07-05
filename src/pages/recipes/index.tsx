import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Recipe } from "../../types";
import { RecipeCard } from "../../components/recipe-card";

const Recipes = () => {
  const pageSize = 8;
  const location = useLocation();
  const navigate = useNavigate();
  const [cocktails, setCocktails] = useState<Recipe[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const getPage = (pathname: string) => {
    const pageStr = pathname.match(/\d+/);
    if (!pageStr) return 0;
    return parseInt(pageStr[0], 10);
  };
  const page = () => getPage(location.pathname);
  const isCurrentPage = (pageNumber: number) => pageNumber === page();
  const shiftPage = (dir: 1 | -1) => {
    const dest = page() + dir;
    if (dest < 1 || dest > pageCount) return;
    navigate(`/recipes/${dest}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/recipes/all?${new URLSearchParams({
          limit: pageSize.toString(),
          offset: ((getPage(location.pathname) - 1) * 8).toString(),
        })}`
      );
      return response.json();
    };
    fetchData().then((res: { data: Recipe[]; total: number }) => {
      setCocktails(res.data);
      setPageCount(Math.ceil(res.total / pageSize));
    });
  }, [location]);
  return (
    <main className="flex h-full flex-col">
      <nav
        className="mb-2 flex justify-center"
        role="navigation"
        aria-label="Pagination Navigation"
      >
        <ul className="inline-flex -space-x-px">
          <li>
            <button
              onClick={() => shiftPage(-1)}
              type="button"
              data-testid="previous-page"
              aria-disabled={page() < 2 ? "true" : "false"}
              aria-label={`Goto Page ${page() - 1}`}
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
                  className={`border border-gray-300 py-2 px-3 dark:border-gray-700${
                    isCurrentPage(pageNumber)
                      ? " bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white"
                      : " bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                  onClick={() => navigate(`/recipes/${pageNumber}`)}
                  aria-label={
                    isCurrentPage(pageNumber)
                      ? `Current Page, Page ${pageNumber}`
                      : `Goto Page ${pageNumber}`
                  }
                  aria-current={isCurrentPage(pageNumber) ? "true" : undefined}
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
              value={page()}
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
              aria-disabled={page() >= pageCount ? "true" : "false"}
              aria-label={`Goto Page ${page() - 1}`}
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
