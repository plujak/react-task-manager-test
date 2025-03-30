import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { Task, TaskAction } from '../types';

//tasks array and dispatch function for manipulating tasks

type TaskContextType = {
  tasks: Task[];
  dispatch: React.Dispatch<TaskAction>;
};

const initialTasks: Task[] = [];

/**
 * Reducer that handles all task-related actions.
 * Processess adding, updating, deleting tasks etc.
 * 
 * @param state - Current array of tasks
 * @param action - Action (ADD_TASK, UPDATE_TASK, etc.)
 * @returns Updated array of tasks afterr the action is performed
 */
const taskReducer = (state: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload];
      
    case 'UPDATE_TASK':
      return state.map(task => 
        task.id === action.payload.id ? action.payload : task
      );
      
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);
      
    case 'TOGGLE_COMPLETE':
      return state.map(task => 
        task.id === action.payload 
          ? { ...task, completed: !task.completed, updatedAt: new Date() } 
          : task
      );
      
    default:
      return state;
  }
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

/**
 * Central sore for managing all tasks in the application.
 * 
 * @param children - React nodes that will have access to the task context
 */
export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  
  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

/**
 * Custom hook to access the task context.
 * 
 * @returns TaskContextType object containing tasks array and dispatch function
 * @throws Error if used outside of a TaskProvider
 */
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};