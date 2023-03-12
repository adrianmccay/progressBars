import React from "react";
import { render } from "@testing-library/react";
import { screen , fireEvent } from "@testing-library/dom";
import ProgressBarControls from "./ProgressBarControls";
import { progressBarSingle, progressBarMultiple } from "../data/testData";

describe("ProgressBarControls", () => {
  const updateProgressBar = jest.fn();

  it("renders without errors", () => {
    const { container } = render(<ProgressBarControls progressBars={progressBarSingle} updateProgressBar={updateProgressBar} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders the progress bar controls", () => {
    const { container } = render(<ProgressBarControls progressBars={progressBarSingle} updateProgressBar={updateProgressBar} />);
    expect(container.querySelector(".progress-bar-controls")).toBeInTheDocument();
  });

  it("renders the progress bar controls with the correct number of buttons", () => {
    const { container } = render(<ProgressBarControls progressBars={progressBarMultiple} updateProgressBar={updateProgressBar} />);
    expect(container.querySelectorAll("button")).toHaveLength(4);
  });

  it("renders the progress bar controls with the correct button labels", () => {
    const { container } = render(<ProgressBarControls progressBars={progressBarMultiple} updateProgressBar={updateProgressBar} />);

    const buttons = container.querySelectorAll(".progress-button");
    expect(buttons[0]).toHaveTextContent("-25");
    expect(buttons[1]).toHaveTextContent("-10");
    expect(buttons[2]).toHaveTextContent("+10");
    expect(buttons[3]).toHaveTextContent("+25");
  });

  it("renders the progress bar controls with the dropdown selected to the first progress bar", () => {
    const { container } = render(<ProgressBarControls progressBars={progressBarMultiple} updateProgressBar={updateProgressBar} />);
    expect(container.querySelector(".bar-select")).toHaveTextContent("#progress 1");
  });

  it("updates the progress bar when the buttons are clicked", () => {
    const updateProgressBar = jest.fn();
    const { getByText, getByDisplayValue } = render(
      <ProgressBarControls progressBars={progressBarMultiple} updateProgressBar={updateProgressBar}/>
    );

    // Get the select element and the -10 button
    const minusTenButton = getByText("-10");

    // Click the -10 button twice
    fireEvent.click(minusTenButton);
    fireEvent.click(minusTenButton);

    expect(updateProgressBar).toHaveBeenCalledTimes(2);
    expect(updateProgressBar).toHaveBeenCalledWith(1, -10);
  });
});