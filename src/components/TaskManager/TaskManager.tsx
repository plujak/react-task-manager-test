import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTasks } from '../../context/TaskContext';
import { Task } from '../../types';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const TaskManagerContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const TestErrorContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ErrorButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.error};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.error}dd;
  }
`;

/**
 * Main component for managing tasks 
 * 
 * - Displaying the task input form
 * - Showing separate lists for active and completed tasks
 * - Handling task editing 
 * - Contains a button to test the error boundary
 * 
 * Uses the TaskContext for state management 
 */
const TaskManager: React.FC = () => {
  const { tasks } = useTasks();
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);
  const [shouldThrowError, setShouldThrowError] = useState(false);
  

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  
 
  //Handle if the task is deleted while editing
  useEffect(() => {
    if (taskToEdit && !tasks.some(task => task.id === taskToEdit.id)) {
      setTaskToEdit(undefined);
    }
  }, [tasks, taskToEdit]);
  
  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleCancelEdit = () => {
    setTaskToEdit(undefined);
  };

  // Throw an error when the test button is clicked
  // Just to demonstrate functionality of the ErrorBoundary component
  if (shouldThrowError) {
    throw new Error('Test error message');
  }
  
  return (
    <TaskManagerContainer>
      <TestErrorContainer>
        <ErrorButton onClick={() => setShouldThrowError(true)}>
          Test Error
        </ErrorButton>
      </TestErrorContainer>
      
      <TaskForm 
        taskToEdit={taskToEdit} 
        onCancelEdit={handleCancelEdit} 
      />
      
      <TaskList 
        title="Active Tasks" 
        tasks={activeTasks} 
        onEditTask={handleEditTask}
        emptyMessage="No active tasks. Add a new task to get started!"
      />
      
      <TaskList 
        title="Completed Tasks" 
        tasks={completedTasks} 
        onEditTask={handleEditTask}
        emptyMessage="No completed tasks yet. Complete a task to see it here!"
      />
    </TaskManagerContainer>
  );
};

export default TaskManager; 