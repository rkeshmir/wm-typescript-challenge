import { render, screen, waitFor } from "@testing-library/react";
import Homepage from "./index";
import cocktails from "../../mocks/data/cocktails.json";

it("renders api message", async () => {
  jest.spyOn(window, "fetch").mockResolvedValue({
    json: async () => ({
      cocktails: cocktails.slice(0, 5),
    }),
  });
  render(<Homepage />);
  await waitFor(() =>
    expect(screen.getAllByTestId("cocktail")).toHaveLength(5)
  );
});
