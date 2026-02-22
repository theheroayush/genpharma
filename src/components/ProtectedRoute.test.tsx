import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProtectedRoute } from './ProtectedRoute';
import { AuthContext, type AuthContextType } from '@/contexts/AuthContextContext';
import { MemoryRouter } from 'react-router-dom';
import type { User, Session } from '@supabase/supabase-js';
import type { Profile } from '@/types';

// Helper to create a mock context
const createMockContext = (overrides: Partial<AuthContextType>): AuthContextType => ({
    user: null,
    profile: null,
    session: null,
    loading: false,
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    refreshProfile: vi.fn(),
    ...overrides
});

describe('ProtectedRoute', () => {
    it('blocks unapproved admin access (vulnerability check)', () => {
        const mockContext = createMockContext({
            user: { id: '1' } as unknown as User,
            profile: { role: 'admin', approved: false } as unknown as Profile,
            session: {} as unknown as Session,
        });

        render(
            <AuthContext.Provider value={mockContext}>
                <MemoryRouter>
                    <ProtectedRoute allowedRoles={['admin']}>
                        <div>Admin Content</div>
                    </ProtectedRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.queryByText('Admin Content')).not.toBeInTheDocument();
        expect(screen.getByText(/Pending Approval/i)).toBeInTheDocument();
    });

    it('blocks unapproved pharmacist access (existing check)', () => {
        const mockContext = createMockContext({
            user: { id: '2' } as unknown as User,
            profile: { role: 'pharmacist', approved: false } as unknown as Profile,
            session: {} as unknown as Session,
        });

        render(
            <AuthContext.Provider value={mockContext}>
                <MemoryRouter>
                    <ProtectedRoute allowedRoles={['pharmacist']}>
                        <div>Pharmacist Content</div>
                    </ProtectedRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.queryByText('Pharmacist Content')).not.toBeInTheDocument();
        expect(screen.getByText(/Pending Approval/i)).toBeInTheDocument();
    });
});
