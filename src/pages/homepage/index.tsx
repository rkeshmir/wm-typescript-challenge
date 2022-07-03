import { RecipeCard } from "components/recipe-card";
import { useEffect, useState } from "react";
import { Recipe } from "../../types";

const Homepage = () => {
  const [cocktails, setCocktails] = useState<Recipe[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/recipes/popular");
      const data = await response.json();
      return data.cocktails;
    };
    fetchData().then((res: Recipe[]) => setCocktails(res));
  }, []);
  return (
    <main className="flex h-full flex-col">
      <div className="grid gap-2 overflow-y-auto overflow-y-auto sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        {cocktails?.map((cocktail) => (
          <RecipeCard key={cocktail.name} cocktail={cocktail} />
        ))}
      </div>
    </main>
  );
};

export default Homepage;
