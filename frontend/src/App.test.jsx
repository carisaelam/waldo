import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  // App component renders
  it('renders app component', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
