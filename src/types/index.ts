
export type TaskType = 'work' | 'personal' | 'shopping' | 'health' | 'other';

export interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  completed: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Theme {
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    accent: string;
    border: string;
    error: string;
    success: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  boxShadow: string;
  transition: string;
}

/**
 * All possible task actions in the reducer
 */
export type TaskAction = 
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_COMPLETE'; payload: string }; 