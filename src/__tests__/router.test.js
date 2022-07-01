import { Suspense } from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Router } from "../router";

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: MemoryRouter }),
  };
};

test("full app rendering/navigating", async () => {
  const { user } = await renderWithRouter(
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  );

  // Check on the recipes link in the navbar
  await user.click(await screen.findByTestId(/navbar-link--recipes/));

  // Check if the recipes api tekst is visible
  expect(screen.getByText("/api/recipes/all")).toBeInTheDocument();
});
