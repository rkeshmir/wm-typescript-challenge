import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Recipes from "./index";

it("renders navigation and eight recipes", async () => {
  render(
    <MemoryRouter initialEntries={["/recipes/1"]}>
      <Recipes />
    </MemoryRouter>
  );
  expect(screen.getByRole("navigation")).toBeInTheDocument();
  expect(screen.getByLabelText("Current Page, Page 1")).toBeInTheDocument();
  expect(await screen.findAllByTestId(/recipe-/i)).toHaveLength(8);
});

it("navigates on user click on another page", async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={["/recipes/1"]}>
      <Recipes />
    </MemoryRouter>
  );
  await user.click(await screen.findByLabelText("Goto Page 2"));
  expect(
    await screen.findByLabelText("Current Page, Page 2")
  ).toBeInTheDocument();
  expect(await screen.findAllByTestId(/recipe-/i)).toHaveLength(8);
});
