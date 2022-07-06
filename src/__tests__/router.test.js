import { Suspense } from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Router } from "../router";
import NotFound from "../pages/not-found";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route); //  TODO: the passed route is not applied correctly

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: MemoryRouter }),
  };
};

test("full app rendering/navigating", async () => {
  const { user } = renderWithRouter(
    <Suspense fallback={null}>
      <Router />
    </Suspense>,
    { route: "" }
  );
  expect(await screen.findAllByRole("navigation")).toHaveLength(2);
  await user.click(await screen.findByLabelText("Goto Page Recipes"));
  await user.click(await screen.findByLabelText("Goto Page Home"));
});

test("Show not found page", async () => {
  const badRoute = "/some-bad-route";
  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <NotFound />
    </MemoryRouter>
  );

  expect(await screen.findByRole("alert")).toBeInTheDocument();
});
