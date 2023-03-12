import React from "react";
import ProgressBar from "./ProgressBar";
import { ProgressBarData } from "../types";

interface ProgressBarProps {
  progressBars: ProgressBarData[];
}

const ProgressBars = ({ progressBars }: ProgressBarProps) => {
  return (
    <div className="progress-bars">
      {progressBars.map((bar) => (
        <ProgressBar key={bar.id} progress={bar.progress} />
      ))}
    </div>
  );
};

export default ProgressBars;