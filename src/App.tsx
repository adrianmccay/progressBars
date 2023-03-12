import React, { useState } from "react";
import ProgressBars from './components/ProgressBars';
import ProgressBarControls from './components/ProgressBarControls';
import { ProgressBarData } from './types';
import progressBars from './data/init';
import { Container, Typography , CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./style/default";

/**
 * App
 *
 * @constructor
 */
const App = () => {
  const [ progressBarsState, setProgressBars ] = useState(progressBars);
  const updateProgressBar = (id: number, value: number) => {
    const newProgressBars = progressBarsState.map((bar: ProgressBarData) => {
      if (bar.id === id) {
        return {
          ...bar,
          progress: Math.max(bar.progress + value, 0),
        };
      }
      return bar;
    });

    setProgressBars(newProgressBars);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography variant="h1" component="h1">Progress Bars Demo</Typography>
        <ProgressBars progressBars={progressBarsState} />
        <ProgressBarControls progressBars={progressBarsState} updateProgressBar={updateProgressBar} />
      </Container>
    </ThemeProvider>
  );
};

export default App;
