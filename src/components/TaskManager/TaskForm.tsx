import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTasks } from '../../context/TaskContext';
import { Task, TaskType } from '../../types';

let nextTaskId = 1;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.label`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
  }
`;

interface TaskFormProps {
  taskToEdit?: Task;
  onCancelEdit?: () => void;
}

const initialTask = {
  id: '',
  title: '',
  description: '',
  type: 'work' as TaskType,
  completed: false,
  createdAt: new Date(),
};

const TaskForm: React.FC<TaskFormProps> = ({ taskToEdit, onCancelEdit }) => {
  const [formData, setFormData] = useState<Omit<Task, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }>(initialTask);
  const { dispatch } = useTasks();
  const isEditing = !!taskToEdit;

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        id: taskToEdit.id,
        title: taskToEdit.title,
        description: taskToEdit.description,
        type: taskToEdit.type,
        completed: taskToEdit.completed,
      });
    } else {
      setFormData(initialTask);
    }
  }, [taskToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a title for the task');
      return;
    }

    if (isEditing && taskToEdit) {
      dispatch({
        type: 'UPDATE_TASK',
        payload: {
          ...taskToEdit,
          ...formData,
          updatedAt: new Date(),
        } as Task,
      });
      if (onCancelEdit) onCancelEdit();
    } else {
      dispatch({
        type: 'ADD_TASK',
        payload: {
          ...formData,
          id: String(nextTaskId++),
          createdAt: new Date(),
        } as Task,
      });
      setFormData(initialTask);
    }
  };

  const handleCancel = () => {
    if (onCancelEdit) onCancelEdit();
    setFormData(initialTask);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
      
      <FormGroup>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Task title"
          required
        />
      </FormGroup>
      
      <FormGroup>
        <Label htmlFor="type">Type</Label>
        <Select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
          <option value="health">Health</option>
          <option value="other">Other</option>
        </Select>
      </FormGroup>
      
      <FormGroup>
        <Label htmlFor="description">Description</Label>
        <TextArea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Task description"
        />
      </FormGroup>
      
      <ButtonContainer>
        <Button type="submit">
          {isEditing ? 'Update Task' : 'Add Task'}
        </Button>
        {isEditing && (
          <CancelButton type="button" onClick={handleCancel}>
            Cancel
          </CancelButton>
        )}
      </ButtonContainer>
    </FormContainer>
  );
};

export default TaskForm; 