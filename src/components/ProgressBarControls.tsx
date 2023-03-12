import React, { useState } from "react";
import { ProgressBarData } from "../types";
import { Button, MenuItem, Select, Grid } from "@mui/material";

interface ProgressBarProps {
  progressBars: ProgressBarData[];
  updateProgressBar: (id: number, value: number) => void
}

const ProgressBarControls = ({ progressBars, updateProgressBar }: ProgressBarProps ) => {
  const [ selectedBar, setSelectedBar ] = useState(progressBars[ 0 ].id);

  const handleValueChange = (value: number) => {
    updateProgressBar(selectedBar, value);
  };

  return (
    <Grid container className="progress-bar-controls" spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} md={4}>
        <Select data-testid={'bar-select'} className="bar-select" value={selectedBar.toString()} onChange={(e) => setSelectedBar(parseInt(e.target.value))}>
          {progressBars.map((bar) => (
            <MenuItem className={'progress-bar-name'} key={bar.id} value={bar.id}>
              #progress {bar.id}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid className={'button-group'} item xs={12} md={8}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <Button className="progress-button" variant="contained" onClick={() => handleValueChange(-25)}>-25</Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button className="progress-button" variant="contained" onClick={() => handleValueChange(-10)}>-10</Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button className="progress-button" variant="contained" onClick={() => handleValueChange(10)}>+10</Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button className="progress-button" variant="contained" onClick={() => handleValueChange(25)}>+25</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProgressBarControls;