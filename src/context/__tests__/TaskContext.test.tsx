import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskProvider, useTasks } from '../TaskContext';
import { Task } from '../../types';

// Test component to interact with the TaskContext
const TestComponent = () => {
  const { tasks, dispatch } = useTasks();

  const addTask = () => {
    const newTask: Task = {
      id: '999',
      title: 'New Test Task',
      description: 'Test Description',
      type: 'work',
      completed: false,
      createdAt: new Date(),
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const updateTask = () => {
    // First, make sure the task exists
    const existingTask = tasks.find(task => task.id === '999');
    if (existingTask) {
      const updatedTask: Task = {
        ...existingTask,
        title: 'Updated Task Title',
        description: 'Updated Description',
        type: 'personal',
        updatedAt: new Date(),
      };
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    }
  };

  // Try to update a non-existent task (edge case)
  const updateNonExistentTask = () => {
    const nonExistentTask: Task = {
      id: 'non-existent-id',
      title: 'This Task Does Not Exist',
      description: 'This should not update anything',
      type: 'work',
      completed: false,
      createdAt: new Date(),
    };
    dispatch({ type: 'UPDATE_TASK', payload: nonExistentTask });
  };

  // Add a task with an empty title (edge case)
  const addInvalidTask = () => {
    const invalidTask: Task = {
      id: '888',
      title: '', // Empty title (invalid)
      description: 'This has an empty title',
      type: 'work',
      completed: false,
      createdAt: new Date(),
    };
    dispatch({ type: 'ADD_TASK', payload: invalidTask });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const toggleComplete = (id: string) => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: id });
  };

  return (
    <div>
      <button onClick={addTask}>Add Task</button>
      <button onClick={updateTask}>Update Task</button>
      <button onClick={updateNonExistentTask}>Update Non-Existent Task</button>
      <button onClick={addInvalidTask}>Add Invalid Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} data-testid={`task-${task.id}`}>
            <span data-testid={`title-${task.id}`}>{task.title}</span>
            <span data-testid={`description-${task.id}`}>{task.description}</span>
            <span data-testid={`type-${task.id}`}>{task.type}</span>
            <span data-completed={task.completed}>
              {task.completed ? 'Completed' : 'Incomplete'}
            </span>
            <button onClick={() => toggleComplete(task.id)}>Toggle</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

describe('TaskContext', () => {
  test('should add a new task', () => {
    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );
    
    // No tasks at start
    expect(screen.queryByTestId(/task-/)).not.toBeInTheDocument();
    
    // Add a task
    fireEvent.click(screen.getByText('Add Task'));
    
    // Task should be added
    expect(screen.getByTestId('task-999')).toBeInTheDocument();
    expect(screen.getByText('New Test Task')).toBeInTheDocument();
  });
  
  test('should delete a task', () => {
    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );
    
    // Add a task first
    fireEvent.click(screen.getByText('Add Task'));
    expect(screen.getByTestId('task-999')).toBeInTheDocument();
    
    // Delete the task
    fireEvent.click(screen.getByText('Delete'));
    
    // Task should be gone
    expect(screen.queryByTestId('task-999')).not.toBeInTheDocument();
  });
  
  test('should toggle task completion status', () => {
    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );
    
    // Add a task first
    fireEvent.click(screen.getByText('Add Task'));
    
    // Initially incomplete
    const statusElement = screen.getByText('Incomplete');
    expect(statusElement.getAttribute('data-completed')).toBe('false');
    
    // Toggle completion
    fireEvent.click(screen.getByText('Toggle'));
    
    // Should now be complete
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Completed').getAttribute('data-completed')).toBe('true');
  });


  test('should update an existing task', () => {
    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );
    
    // Add a task first
    fireEvent.click(screen.getByText('Add Task'));
    expect(screen.getByTestId('title-999')).toHaveTextContent('New Test Task');
    expect(screen.getByTestId('type-999')).toHaveTextContent('work');
    
    // Update the task
    fireEvent.click(screen.getByText('Update Task'));
    
    // Task should be updated
    expect(screen.getByTestId('title-999')).toHaveTextContent('Updated Task Title');
    expect(screen.getByTestId('description-999')).toHaveTextContent('Updated Description');
    expect(screen.getByTestId('type-999')).toHaveTextContent('personal');
  });

  test('should not affect state when updating non-existent task', () => {
    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );
    
    // Add a task first to have something in the state
    fireEvent.click(screen.getByText('Add Task'));
    const initialTaskCount = screen.getAllByTestId(/task-/).length;
    
    // Try updating a non-existent task
    fireEvent.click(screen.getByText('Update Non-Existent Task'));
    
    // State should remain unchanged
    expect(screen.getAllByTestId(/task-/).length).toBe(initialTaskCount);
    expect(screen.queryByTestId('task-non-existent-id')).not.toBeInTheDocument();
    
    // Original task should still be the same
    expect(screen.getByTestId('title-999')).toHaveTextContent('New Test Task');
  });

  test('should handle adding and updating tasks with empty properties', () => {
    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );
    
    // Add an invalid task with empty title
    fireEvent.click(screen.getByText('Add Invalid Task'));
    
    // Task should still be added (the reducer doesn't validate data)
    expect(screen.getByTestId('task-888')).toBeInTheDocument();
    
    // The title element should be empty
    expect(screen.getByTestId('title-888')).toHaveTextContent('');
  });

  test('should handle multiple operations in sequence', () => {
    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );
    
    // Step 1: Add a task
    fireEvent.click(screen.getByText('Add Task'));
    expect(screen.getByTestId('task-999')).toBeInTheDocument();
    
    // Step 2: Update the task
    fireEvent.click(screen.getByText('Update Task'));
    expect(screen.getByTestId('title-999')).toHaveTextContent('Updated Task Title');
    
    // Step 3: Toggle completion
    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByText('Completed')).toBeInTheDocument();
    
    // Step 4: Delete the task
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.queryByTestId('task-999')).not.toBeInTheDocument();
    
    // Step 5: Add another task
    fireEvent.click(screen.getByText('Add Task'));
    expect(screen.getByTestId('task-999')).toBeInTheDocument();
  });
}); 