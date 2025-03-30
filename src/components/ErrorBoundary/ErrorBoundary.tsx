import { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';


interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * State for the ErrorBoundary 
 * @property hasError - an error flag
 * @property error - error that was caught
 */
interface State {
  hasError: boolean;
  error: Error | null;
}

const ErrorContainer = styled.div`
  padding: 2rem;
  margin: 1rem 0;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.error}20;
  border: 1px solid ${({ theme }) => theme.colors.error};
  text-align: center;
`;

const ErrorMessage = styled.div`
  margin-bottom: 1rem;
  
  h2 {
    color: ${({ theme }) => theme.colors.error};
    margin-bottom: 0.5rem;
  }
  
  p {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ResetButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

/**
 * Use this compoennt to wrap sections of an app to catch errors in child components.
 * 
 * @example
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  /**
   * Called when an error is caught.
   * 
   * @param error - The error that was thrown
   * @param errorInfo - Component stack trace info
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  /**
   * Resets the error state to allow recovery.
   * call this to clear the error and try to re-render
   */
  resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <ErrorContainer>
          <ErrorMessage>
            <h2>Something went wrong</h2>
            <p>{this.state.error?.message || 'An unexpected error occurred'}</p>
          </ErrorMessage>
          <ResetButton onClick={this.resetErrorBoundary}>
            Try Again
          </ResetButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 