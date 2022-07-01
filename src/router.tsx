import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/main";

import { Homepage, Recipes } from "./pages";

export const ROUTES = {
  HOME: "/",
  RECIPES: "/recipes/:page",
  RECIPES_NO_PAGE: "/recipes",
};

export const Router = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<Homepage />} />
        <Route path={ROUTES.RECIPES} element={<Recipes />} />
        <Route
          path={ROUTES.RECIPES_NO_PAGE}
          element={<Navigate replace to={`${ROUTES.RECIPES_NO_PAGE}/1`} />}
        />
      </Route>
    </Routes>
  );
};
