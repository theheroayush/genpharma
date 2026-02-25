import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginPage from './LoginPage';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContextContext';

// Mock AuthContext values
const mockLogin = vi.fn().mockResolvedValue({ error: undefined });
const mockAuthContext = {
    user: null,
    profile: null,
    session: null,
    loading: false,
    login: mockLogin,
    register: vi.fn(),
    logout: vi.fn(),
    refreshProfile: vi.fn(),
};

const renderWithAuth = (ui: React.ReactNode) => {
    return render(
        <AuthContext.Provider value={mockAuthContext}>
            <MemoryRouter>{ui}</MemoryRouter>
        </AuthContext.Provider>
    );
};

describe('LoginPage', () => {
    it('renders correctly', () => {
        renderWithAuth(<LoginPage />);
        expect(screen.getByText('Sign In')).toBeInTheDocument();
    });

    it('associates label with email input', () => {
        renderWithAuth(<LoginPage />);
        // expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        // Since existing code is broken, we expect getByLabelText to throw or fail if we assert on it.
        // But for TDD, we write the test expecting success, verify it fails, then fix code.
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('associates label with password input', () => {
        renderWithAuth(<LoginPage />);
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('has accessible password toggle button', () => {
        renderWithAuth(<LoginPage />);
        // The button should have an aria-label describing its action
        const toggleButton = screen.getByRole('button', { name: /show password/i });
        expect(toggleButton).toBeInTheDocument();
    });
});
