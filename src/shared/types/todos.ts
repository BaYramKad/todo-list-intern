export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export type TaskStatuses = 'all' | 'active' | 'completed';
export type TodoListT = Record<TaskStatuses, Task[]>;
