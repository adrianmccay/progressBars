import React from "react";
import '../style/default.scss';
interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  let className = "valid";
  if (progress > 100) {
    className = "overLimit";
  }

  return (
    <div className="progress-bar">
      <div
        className={`progress-fill ${className}`}
        style={{ width: `${Math.min(progress, 100)}%` }}
      >
      </div>
      <span className="progress-bar-label">{progress}%</span>
    </div>
  );
};

export default React.memo(ProgressBar);