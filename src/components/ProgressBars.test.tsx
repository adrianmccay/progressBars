import React from "react";
import { render } from "@testing-library/react";
import ProgressBars from "./ProgressBars";
import { progressBarSingle, progressBarMultiple } from "../data/testData";

describe("ProgressBars", () => {
  it("renders without errors", () => {
    const { container } = render(<ProgressBars progressBars={progressBarSingle} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders the progress bars list with a single progress bar", () => {
    const { container } = render(<ProgressBars progressBars={progressBarSingle} />);
    expect(container.querySelector(".progress-bars")).toBeInTheDocument();
  });

  it("renders the progress bars list with multiple progress bars", () => {
    const { container } = render(<ProgressBars progressBars={progressBarMultiple} />);
    expect(container.querySelector(".progress-bars")).toBeInTheDocument();
  });

  it("renders the correct number of progress bars", () => {
    const { container } = render(<ProgressBars progressBars={progressBarMultiple} />);
    expect(container.querySelectorAll(".progress-bar")).toHaveLength(progressBarMultiple.length);
  });

  it("renders the correct progress bar label", () => {
    const { container } = render(<ProgressBars progressBars={progressBarSingle} />);
    expect(container.querySelector(".progress-bar")).toHaveTextContent(`${progressBarSingle[0].progress}%`);
  });

  it("renders the correct progress bar labels for multiple progress bars", () => {
    const { container } = render(<ProgressBars progressBars={progressBarMultiple} />);
    const progressBars = container.querySelectorAll('.progress-bar');
    progressBarMultiple.forEach((bar, index) => {
      expect(progressBars[index]).toHaveTextContent(`${bar.progress}%`);
    });
  });

  it("renders the correct progress bar width", () => {
    const { container } = render(<ProgressBars progressBars={progressBarSingle} />);
    expect(container.querySelector(".progress-fill")).toHaveStyle(`width: ${progressBarSingle[0].progress}%`);
  });

  it("renders the correct progress bar widths for multiple progress bars", () => {
    const { container } = render(<ProgressBars progressBars={progressBarMultiple} />);
    const progressBars = container.querySelectorAll('.progress-fill');
    progressBarMultiple.forEach((bar, index) => {
      expect(progressBars[index]).toHaveStyle(`width: ${bar.progress}%`);
    });
  });

});
