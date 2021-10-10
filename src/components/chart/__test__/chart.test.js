import { render, screen } from "@testing-library/react";
import { Chart } from "../index";

describe("chart component", () => {
  it("should rendered by title", () => {
    render(<Chart title="Chart Title" />);
    expect(screen.getByLabelText("card-title")).toBeInTheDocument();
  });
});
