import { Ingredient, Recipe } from "../../types";

export const RecipeCard = (props: { cocktail: Recipe }) => {
  const { cocktail } = props;
  return (
    <div
      role="gridcell"
      className="flex border border-gray-200 bg-white/50 p-4 dark:rounded dark:border-0"
      data-testid={`recipe-${cocktail.name}`}
    >
      <div className="block space-y-2">
        <h2 className="text-2xl font-bold">{cocktail.name}</h2>
        {cocktail.category && (
          <span className="mr-1 inline-block rounded bg-pink-200 py-1 px-2 text-xs font-semibold uppercase text-pink-600 last:mr-0">
            {cocktail.category}
          </span>
        )}

        <h3 className="text-lg font-bold">Ingredients</h3>
        <ul className="list-inside list-disc px-1 text-sm">
          {cocktail.ingredients.map((ingredient: Ingredient) =>
            "special" in ingredient ? (
              <li key={ingredient.special}>{ingredient.special}</li>
            ) : (
              <li key={ingredient.ingredient + ingredient.label}>
                {[
                  ingredient.amount,
                  ingredient.unit,
                  ingredient.ingredient +
                    (ingredient.label ? ` (${ingredient.label})` : ""),
                ].join(" ")}
              </li>
            )
          )}
        </ul>

        <h3 className="text-lg font-bold">Preparation</h3>
        <div className="text-sm">{cocktail.preparation}</div>
      </div>
    </div>
  );
};
