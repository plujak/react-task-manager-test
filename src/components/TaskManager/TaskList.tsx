import React from 'react';
import styled from 'styled-components';
import { Task } from '../../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  title: string;
  onEditTask: (task: Task) => void;
  emptyMessage?: string;
}

const ListContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ListTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
`;

const EmptyMessage = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  font-style: italic;
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  title, 
  onEditTask,
  emptyMessage = 'No tasks found'
}) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      
      {tasks.length === 0 ? (
        <EmptyMessage>{emptyMessage}</EmptyMessage>
      ) : (
        tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onEdit={onEditTask} 
          />
        ))
      )}
    </ListContainer>
  );
};

export default TaskList; 