import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import MainLayout from './MainLayout';
import { fireEvent, waitFor } from '@testing-library/dom';
import type { PropsWithChildren } from 'react';

const mockUseGetRandomUserQuery = jest.fn();

jest.mock('../../common/UserSection', () => {
  return function MockUserSection({ user, collapsed }:{ user:{name: string, email: string}, collapsed: boolean }) {
    return (
      <div data-testid="user-section">
        <div data-testid="user-collapsed">{collapsed.toString()}</div>
        {user ? (
          <div data-testid="user-data">
            <span data-testid="user-name">{user.name}</span>
            <span data-testid="user-email">{user.email}</span>
          </div>
        ) : (
          <div data-testid="user-loading">Loading user...</div>
        )}
      </div>
    );
  };
});

jest.mock('../../../services/user', () => ({
  useGetRandomUserQuery: () => mockUseGetRandomUserQuery(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  Outlet: () => <div data-testid="outlet">Content Area</div>,
}));

const createMockStore = () =>
  configureStore({
    reducer: {
      api: (state = {}) => state,
    },
  });

const TestWrapper = ({ children }: PropsWithChildren) => {
  const store = createMockStore();
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

describe('MainLayout Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('User Data Fetching', () => {
    it('should fetch user data on component mount', () => {
      mockUseGetRandomUserQuery.mockReturnValue({ data: null, isLoading: true, error: null });
      render(
        <TestWrapper>
          <MainLayout />
        </TestWrapper>
      );
      expect(mockUseGetRandomUserQuery).toHaveBeenCalled();
    });

    it('should display user data when fetch is successful', () => {
      mockUseGetRandomUserQuery.mockReturnValue({
        data: { id: 1, name: 'John Doe', email: 'john@example.com' },
        isLoading: false,
        error: null,
      });
      render(
        <TestWrapper>
          <MainLayout />
        </TestWrapper>
      );
      expect(screen.getByTestId('user-name')).toHaveTextContent('John Doe');
      expect(screen.getByTestId('user-email')).toHaveTextContent('john@example.com');
    });

    it('should display loading state when user data is being fetched', () => {
      mockUseGetRandomUserQuery.mockReturnValue({ data: null, isLoading: true, error: null });
      render(
        <TestWrapper>
          <MainLayout />
        </TestWrapper>
      );
      expect(screen.getByTestId('user-loading')).toBeInTheDocument();
    });

    it('should handle undefined user data gracefully', () => {
      mockUseGetRandomUserQuery.mockReturnValue({ data: undefined, isLoading: false, error: null });
      render(
        <TestWrapper>
          <MainLayout />
        </TestWrapper>
      );
      expect(screen.getByTestId('user-loading')).toBeInTheDocument();
    });
  });

  describe('Sider Component', () => {
    it('should render sider with correct width when not collapsed', () => {
      mockUseGetRandomUserQuery.mockReturnValue({
        data: { name: 'Test User', email: 'test@example.com' },
        isLoading: false,
        error: null,
      });
      render(
        <TestWrapper>
          <MainLayout />
        </TestWrapper>
      );
      expect(document.querySelector('.ant-layout-sider')).toHaveStyle('width: 280px');
    });

    it('should toggle collapsed state when button is clicked', async () => {
      mockUseGetRandomUserQuery.mockReturnValue({
        data: { name: 'Test User', email: 'test@example.com' },
        isLoading: false,
        error: null,
      });
      render(
        <TestWrapper>
          <MainLayout />
        </TestWrapper>
      );

      const button = screen.getByRole('button', { name: /menu/i });
      fireEvent.click(button);
      await waitFor(() => expect(screen.getByTestId('user-collapsed')).toHaveTextContent('true'));
    });
  });

  describe('Avatar Component', () => {
    it('should render avatar with initials when user data is available', () => {
      mockUseGetRandomUserQuery.mockReturnValue({
        data: { name: 'John Doe', email: 'john@example.com' },
        isLoading: false,
        error: null,
      });
      render(
        <TestWrapper>
          <MainLayout />
        </TestWrapper>
      );
      const avatarImg = document.querySelector('.ant-avatar img');
      expect(avatarImg).toHaveAttribute('src', expect.stringContaining('ui-avatars.com'));
    });

    it('should render default avatar when no user data is available', () => {
      mockUseGetRandomUserQuery.mockReturnValue({ data: null, isLoading: false, error: null });
      render(
        <TestWrapper>
          <MainLayout />
        </TestWrapper>
      );
      const avatar = document.querySelector('.ant-avatar');
      expect(avatar).toHaveTextContent('?');
    });
  });

  describe('Error Handling', () => {
    it('should handle API error gracefully', () => {
      mockUseGetRandomUserQuery.mockReturnValue({
        data: null,
        isLoading: false,
        error: { message: 'Fetch failed' },
      });
      render(
        <TestWrapper>
          <MainLayout />
        </TestWrapper>
      );
      expect(screen.getByTestId('user-loading')).toBeInTheDocument();
    });
  });
});
