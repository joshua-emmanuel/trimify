import '@testing-library/jest-dom';
import { expect, describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '@/components/header';

describe('<Header/>', () => {
  test('Renders Header', () => {
    render(<Header user={null} />);
  });

  test('shows Login and Sign Up buttons when user is null', () => {
    render(<Header user={null} />);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();

    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  test('shows Dashboard button when user is defined', () => {
    render(<Header user={{ id: 'f750a1f9-c4d6-3dd5-9a0a-f2a09e173e73' }} />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();

    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
  });
});
