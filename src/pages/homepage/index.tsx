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
    <main>
      <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
        {cocktails.map((cocktail) => (
          <RecipeCard key={cocktail.name} cocktail={cocktail} />
        ))}
      </div>
    </main>
  );
};

export default Homepage;
