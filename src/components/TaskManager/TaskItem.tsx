import React from 'react';
import styled from 'styled-components';
import { Task } from '../../types';
import { useTasks } from '../../context/TaskContext';

/**
 * Props for the TaskItem compnent
 * @property task - The task data to display
 * @property onEdit - Callback function when the user wants to edit a task
 */
interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskItemContainer = styled.div<{ completed: boolean }>`
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.boxShadow};
  transition: ${({ theme }) => theme.transition};
  opacity: ${({ completed }) => (completed ? 0.7 : 1)};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const TaskTitle = styled.h3<{ completed: boolean }>`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  flex: 1;
`;

const TaskType = styled.span`
  font-size: 0.8rem;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

const TaskDescription = styled.p<{ completed: boolean }>`
  color: ${({ theme }) => theme.colors.secondary};
  margin: ${({ theme }) => theme.spacing.sm} 0;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
`;

const TaskDate = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const TaskActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const ActionButton = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: ${({ theme }) => theme.colors.error};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.error}dd;
  }
`;

const CompleteButton = styled(ActionButton)<{ completed: boolean }>`
  background-color: ${({ theme, completed }) => 
    completed ? theme.colors.secondary : theme.colors.success};
  
  &:hover {
    background-color: ${({ theme, completed }) => 
      completed ? theme.colors.secondary : theme.colors.success}dd;
  }
`;

// Icons
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
  </svg>
);

/**
 * Helper function to format date in a human-readable format
 * Uses toLocaleDateString to display date and time in a user-friendly way.
 * 
 * @param date - The date to format (can be a Date or date string)
 * @returns Formatted date string in the format "Month Day, Year, HH:MM"
 */
const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Component that renders an individual task item.
 * 
 * Displays the task details and provides buttons for:
 * - Marking a task as complete/incomplete
 * - Editing a task
 * - Deleting a task
 * 
 * Visually indicates complested tasks with strikethrough text and reduced opacity.
 * 
 * @param task - The task data to display
 * @param onEdit - Callback function when edit button is clicked
 */
const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
  const { dispatch } = useTasks();

  /**
   * Toggles the completed status of the task
   * Dispaches TOGGLE_COMPLETE action to the task reducer
   */
  const handleToggleComplete = () => {
    dispatch({
      type: 'TOGGLE_COMPLETE',
      payload: task.id
    });
  };

  /**
   * Deletes the task after confimation
   * Shows a confirmation dialog to prevent accidental deletions
   */
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch({
        type: 'DELETE_TASK',
        payload: task.id
      });
    }
  };

  /**
   * Calls the parent component's edit function to start editing this task
   */
  const handleEdit = () => {
    onEdit(task);
  };

  return (
    <TaskItemContainer completed={task.completed} data-completed={task.completed}>
      <TaskHeader>
        <TaskTitle completed={task.completed}>{task.title}</TaskTitle>
        <TaskType>{task.type}</TaskType>
      </TaskHeader>
      
      {task.description && (
        <TaskDescription completed={task.completed}>
          {task.description}
        </TaskDescription>
      )}
      
      <TaskDate>
        Created: {formatDate(task.createdAt)}
        {task.updatedAt && ` (Updated: ${formatDate(task.updatedAt)})`}
      </TaskDate>
      
      <TaskActions>
        <CompleteButton 
          completed={task.completed}
          onClick={handleToggleComplete}
        >
          <CheckIcon />
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </CompleteButton>
        
        <ActionButton onClick={handleEdit}>
          <EditIcon />
          Edit
        </ActionButton>
        
        <DeleteButton onClick={handleDelete}>
          <DeleteIcon />
          Delete
        </DeleteButton>
      </TaskActions>
    </TaskItemContainer>
  );
};

export default TaskItem; 