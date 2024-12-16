import React from "react";
import "./styles/progresscircle.css";

function ProgressCircle({ progress }) {
  return (
    <div className="progress-container">
      <div className="circle-progress">
        <svg viewBox="0 0 36 36" className="circular-chart green">
          <path
            className="circle-bg"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="circle"
            strokeDasharray={`${progress}, 100`}
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" className="percentage">
            {progress}%
          </text>
        </svg>
      </div>
      <div className="progress-text">
        <h3>Improvement within 3 months</h3>
        <p>Show improvement of anxiety or depression symptoms within 3 months.</p>
      </div>
    </div>
  );
}

export default ProgressCircle;
