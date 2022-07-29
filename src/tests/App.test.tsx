import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../App';
import Main from '../structure/Main';

describe('Simple tests', () => {
  test('renders App component', () => {
    render(<App />);
    const appElement = screen.getByText(/ATM - IBEXA/i);
    expect(appElement).toBeInTheDocument();
  });
  test('change action', () => {
    render(<Main />);
    const withdrawActionButton = screen.getByText(/withdraw/i);
    const atmScreen = screen.getByTestId("atm-screen");
    fireEvent.click(withdrawActionButton);
    expect(withdrawActionButton).toBeInTheDocument();
    expect(withdrawActionButton.classList.contains('active')).toBe(true);
    expect(atmScreen.classList.contains('red')).toBe(true);
  });
  test('deposit money', () => {
    render(<Main />);
    const balance = screen.getByTestId("account-label-balance");
    const income = screen.getByTestId("account-label-income");
    const twoButton = screen.getByTestId("atm-button-2");
    const zeroButton = screen.getByTestId("atm-button-0");
    const acceptButton = screen.getByTestId("atm-button-accept");
    const atmScreen = screen.getByTestId("atm-screen");
    const depositActionButton = screen.getByText(/deposit/i);

    expect(twoButton).toBeInTheDocument();
    expect(zeroButton).toBeInTheDocument();
    expect(acceptButton).toBeInTheDocument();
    expect(balance).toBeInTheDocument();
    expect(income).toBeInTheDocument();
    expect(depositActionButton).toBeInTheDocument();
    expect(depositActionButton.classList.contains('active')).toBe(true);
    expect(atmScreen.classList.contains('green')).toBe(true);
  
    fireEvent.click(twoButton);
    for (let i = 0; i < 3; i++) {
      fireEvent.click(zeroButton);
    }
    expect(atmScreen).toHaveTextContent("2000");
    fireEvent.click(acceptButton);

    expect(balance).toHaveTextContent("4 000$");
    expect(income).toHaveTextContent("2 000$");
  });
  test('withdrow money', () => {
    render(<Main />);
    const balance = screen.getByTestId("account-label-balance");
    const outcome = screen.getByTestId("account-label-outcome");
    const oneButton = screen.getByTestId("atm-button-1");
    const zeroButton = screen.getByTestId("atm-button-0");
    const acceptButton = screen.getByTestId("atm-button-accept");
    const withdrawActionButton = screen.getByText(/withdraw/i);
    const atmScreen = screen.getByTestId("atm-screen");
    fireEvent.click(withdrawActionButton);

    expect(oneButton).toBeInTheDocument();
    expect(zeroButton).toBeInTheDocument();
    expect(acceptButton).toBeInTheDocument();
    expect(balance).toBeInTheDocument();
    expect(outcome).toBeInTheDocument();
    expect(withdrawActionButton).toBeInTheDocument();
    expect(withdrawActionButton.classList.contains('active')).toBe(true);
    expect(atmScreen.classList.contains('red')).toBe(true);

    fireEvent.click(oneButton);
    for (let i = 0; i < 3; i++) {
      fireEvent.click(zeroButton);
    }
    expect(atmScreen).toHaveTextContent("1000");
    fireEvent.click(acceptButton);

    expect(balance).toHaveTextContent("1 000$");
    expect(outcome).toHaveTextContent("1 000$");
  });
  test('clear button', () => {
    render(<Main />);
    const clearButton = screen.getByTestId("atm-button-clear");
    const atmScreen = screen.getByTestId("atm-screen");
    const threeButton = screen.getByTestId("atm-button-3");
    const fourButton = screen.getByTestId("atm-button-4");
    const fiveButton = screen.getByTestId("atm-button-5");
    
    expect(clearButton).toBeInTheDocument();
    expect(atmScreen).toBeInTheDocument();

    fireEvent.click(threeButton);
    fireEvent.click(fourButton);
    fireEvent.click(fiveButton);

    expect(atmScreen).toHaveTextContent("345");
    
    fireEvent.click(clearButton);

    expect(atmScreen).toHaveTextContent("0");
  });
});
