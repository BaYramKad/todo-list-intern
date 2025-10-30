import type { TodoListT } from './types/todos';

export const tasks: TodoListT = {
  active: [],
  completed: [],
  all: [],
};

export const TaskStatus = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
} as const;
