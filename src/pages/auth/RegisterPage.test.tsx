import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RegisterPage from './RegisterPage';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContextContext';

// Mock AuthContext values
const mockRegister = vi.fn().mockResolvedValue({ error: undefined });
const mockAuthContext = {
    user: null,
    profile: null,
    session: null,
    loading: false,
    login: vi.fn(),
    register: mockRegister,
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

describe('RegisterPage', () => {
    it('renders correctly', () => {
        renderWithAuth(<RegisterPage />);
        expect(screen.getByText('Create Your Account')).toBeInTheDocument();
    });

    it('associates label with full name input', () => {
        renderWithAuth(<RegisterPage />);
        expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    });

    it('associates label with email input', () => {
        renderWithAuth(<RegisterPage />);
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('associates label with phone number input', () => {
        renderWithAuth(<RegisterPage />);
        expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    });

    it('associates label with password input', () => {
        renderWithAuth(<RegisterPage />);
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('has accessible password toggle button', () => {
        renderWithAuth(<RegisterPage />);
        const toggleButton = screen.getByRole('button', { name: /show password/i });
        expect(toggleButton).toBeInTheDocument();
    });
});
