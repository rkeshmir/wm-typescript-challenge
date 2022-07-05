import { render, screen } from "@testing-library/react";
import Homepage from "./index";

it("should show five recipes in the home page", async () => {
  render(<Homepage />);
  expect(await screen.findAllByTestId(/recipe/)).toHaveLength(5);
});
