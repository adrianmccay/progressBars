import React from "react";
import { render } from "@testing-library/react";
import ProgressBar from "./ProgressBar";

describe("ProgressBar", () => {
  it("renders without errors", () => {
    const { container } = render(<ProgressBar progress={0} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders the progress bar", () => {
    const { container } = render(<ProgressBar progress={0} />);
    expect(container.querySelector(".progress-bar")).toBeInTheDocument();
  });

  it("renders the progress", () => {
    const { container } = render(<ProgressBar progress={0} />);
    expect(container.querySelector(".progress-fill")).toBeInTheDocument();
  });

  it("renders the progress with the width 50%", () => {
    const { container } = render(<ProgressBar progress={50} />);
    expect(container.querySelector(".progress-fill")).toHaveStyle("width: 50%");
  });

  it("renders the progress with the width 100%", () => {
    const { container } = render(<ProgressBar progress={100} />);
    expect(container.querySelector(".progress-fill")).toHaveStyle("width: 100%");
  });
});