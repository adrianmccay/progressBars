import React from "react";
import App from './App';
import { render } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';

import progressBarMultiple from "./data/init";

describe('App', () => {
  it('renders without errors', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the heading', () => {
    const { getByRole } = render(<App />);
    expect(getByRole('heading', { name: 'Progress Bars Demo' })).toBeInTheDocument();
  });

  it('renders the progress bar', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.progress-bar')).toBeInTheDocument();
  });

  it('renders the progress bar controls', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.bar-select')).toBeInTheDocument();
    expect(container.querySelector('.progress-bar-controls')).toBeInTheDocument();
  });

  it('renders the progress bar controls with the buttons', () => {
    const { container } = render(<App />);
    expect(container.querySelectorAll('button')).toHaveLength(4);
    expect(container.querySelectorAll('button')[0]).toHaveTextContent('-25');
    expect(container.querySelectorAll('button')[1]).toHaveTextContent('-10');
    expect(container.querySelectorAll('button')[2]).toHaveTextContent('+10');
    expect(container.querySelectorAll('button')[3]).toHaveTextContent('+25');
  });

  it('clicking on +10 updates the correct progress bar', async () => {
    const { container } = render(<App />);
    expect(container.querySelectorAll('.progress-fill')[0]).toHaveStyle(`width: ${progressBarMultiple[0].progress}%`);

    await act(async () => {
      await userEvent.click(container.querySelectorAll('.progress-button')[2]);
    });
    expect(container.querySelector('.progress-fill')).toHaveStyle(`width: ${progressBarMultiple[0].progress + 10}%`);
  });

  it('selected progress bar cannot go below 0%', async () => {
    const { container } = render(<App />);
    // expect the test data to be less than 100 initially
    expect(progressBarMultiple[0].progress).toBeLessThan(100);
    expect(container.querySelectorAll('.progress-fill')[0]).toHaveStyle(`width: ${progressBarMultiple[0].progress}%`);

    // mash the -25 button
    await act(async () => {
      await userEvent.click(container.querySelectorAll('.progress-button')[0]);
    });
    await act(async () => {
      await userEvent.click(container.querySelectorAll('.progress-button')[0]);
    });
    await act(async () => {
      await userEvent.click(container.querySelectorAll('.progress-button')[0]);
    });
    await act(async () => {
      await userEvent.click(container.querySelectorAll('.progress-button')[0]);
    });

    expect(container.querySelectorAll('.progress-fill')[0]).toHaveStyle(`width: 0%`);
  });


  it('selected progress bar to have style overLimit when over 100', async () => {
    const { container } = render(<App />);
    // expect the test data to be less than 100 initially
    expect(progressBarMultiple[0].progress).toBeLessThan(100);
    expect(container.querySelectorAll('.progress-fill')[0]).toHaveStyle(`width: ${progressBarMultiple[0].progress}%`);

    // mash the +25 button
    await act(async () => {
      await userEvent.click(container.querySelectorAll('.progress-button')[3]);
    });
    await act(async () => {
      await userEvent.click(container.querySelectorAll('.progress-button')[3]);
    });
    await act(async () => {
      await userEvent.click(container.querySelectorAll('.progress-button')[3]);
    });
    await act(async () => {
      await userEvent.click(container.querySelectorAll('.progress-button')[3]);
    });
    await act(async () => {
      await userEvent.click(container.querySelectorAll('.progress-button')[3]);
    });

    expect(container.querySelectorAll('.progress-fill')[0]).toHaveStyle(`width: 100%`);
    expect(container.querySelectorAll('.progress-fill')[0]).toHaveClass('overLimit');
  });
});