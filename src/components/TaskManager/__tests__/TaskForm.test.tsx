import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Task } from '../../../types';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../../styles/themes';
import { GlobalStyles } from '../../../styles/GlobalStyles';

const dispatchMock = jest.fn();

jest.mock('../../../context/TaskContext', () => ({
  useTasks: () => ({
    dispatch: dispatchMock,
    tasks: [],
  }),
}));

jest.spyOn(window, 'alert').mockImplementation(() => {});

import TaskForm from '../TaskForm';

// Wrap a component with Theme
const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      {ui}
    </ThemeProvider>
  );
};


describe('TaskForm Component', () => {
  const mockTask: Task = {
    id: '123',
    title: 'Test Task',
    description: 'This is a test task',
    type: 'work',
    completed: false,
    createdAt: new Date('2023-01-01T12:00:00Z'),
  };

  const mockCancelEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form in "Add Task" mode', () => {
    renderWithTheme(<TaskForm />);
    
    expect(screen.getByText('Add New Task')).toBeInTheDocument();
    expect(screen.getByText('Add Task')).toBeInTheDocument();
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });

  test('renders form in "Edit Task" mode when taskToEdit is provided', () => {
    renderWithTheme(<TaskForm taskToEdit={mockTask} onCancelEdit={mockCancelEdit} />);
    
    expect(screen.getByText('Edit Task')).toBeInTheDocument();
    expect(screen.getByText('Update Task')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    
    expect(screen.getByLabelText('Title')).toHaveValue('Test Task');
    expect(screen.getByLabelText('Description')).toHaveValue('This is a test task');
    expect(screen.getByLabelText('Type')).toHaveValue('work');
  });

  test('dispatches ADD_TASK action on form submission in Add mode', () => {
    renderWithTheme(<TaskForm />);
    
    const titleInput = screen.getByLabelText('Title');
    const descriptionInput = screen.getByLabelText('Description');
    const typeSelect = screen.getByLabelText('Type');
    
    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });
    fireEvent.change(typeSelect, { target: { value: 'personal' } });
    
    fireEvent.click(screen.getByText('Add Task'));
    
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'ADD_TASK',
      payload: expect.objectContaining({
        title: 'New Task',
        description: 'New Description',
        type: 'personal',
        completed: false,
      }),
    });
  });

  test('dispatches UPDATE_TASK action on form submission in Edit mode', () => {
    renderWithTheme(<TaskForm taskToEdit={mockTask} onCancelEdit={mockCancelEdit} />);
    
    const titleInput = screen.getByLabelText('Title');
    const descriptionInput = screen.getByLabelText('Description');
    
    fireEvent.change(titleInput, { target: { value: 'Updated Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Updated Description' } });
    
    fireEvent.click(screen.getByText('Update Task'));
    
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'UPDATE_TASK',
      payload: expect.objectContaining({
        id: '123',
        title: 'Updated Task',
        description: 'Updated Description',
        type: 'work',
        completed: false,
        updatedAt: expect.any(Date),
      }),
    });
    
    expect(mockCancelEdit).toHaveBeenCalled();
  });

  test('calls onCancelEdit when Cancel button is clicked', () => {
    renderWithTheme(<TaskForm taskToEdit={mockTask} onCancelEdit={mockCancelEdit} />);
    
    fireEvent.click(screen.getByText('Cancel'));
    
    expect(mockCancelEdit).toHaveBeenCalled();
  });

  test('renders correct task type options', () => {
    renderWithTheme(<TaskForm />);
    
    const typeSelect = screen.getByLabelText('Type');
    
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Personal')).toBeInTheDocument();
    expect(screen.getByText('Shopping')).toBeInTheDocument();
    expect(screen.getByText('Health')).toBeInTheDocument();
    expect(screen.getByText('Other')).toBeInTheDocument();
  });
});