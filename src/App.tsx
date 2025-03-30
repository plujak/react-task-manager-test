import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';
import { GlobalStyles } from './styles/GlobalStyles';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import TaskManager from './components/TaskManager/TaskManager';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const AppTitle = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

const Main = styled.main`
  padding: ${({ theme }) => theme.spacing.md};
`;

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <AppContainer>
        <Header>
          <AppTitle>Task Manager</AppTitle>
          <ThemeToggle />
        </Header>
        
        <Main>
          <ErrorBoundary>
            <TaskProvider>
              <TaskManager />
            </TaskProvider>
          </ErrorBoundary>
        </Main>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
