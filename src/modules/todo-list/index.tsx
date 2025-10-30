import { useCallback, useState } from 'react';
import { tasks, TaskStatus } from '../../shared/tasks';
import type { Task, TaskStatuses, TodoListT } from '../../shared/types/todos';
import InputTask from '../input-todo';
import { CompletedTaskIcon } from '../../shared/ui/icons/completed';
import { ActiveTaskIcon } from '../../shared/ui/icons/active';
import { DeleteTaskIcon } from '../../shared/ui/icons/delete';
import { useLocalStorage } from '../../shared/hooks/useLocalStorage';

export const TodoList = () => {
  const [todos, setTodos] = useLocalStorage<TodoListT>('todos', tasks);
  const [status, setStatus] = useState<TaskStatuses>(TaskStatus.ALL);

  const handleToggleTask = useCallback(
    (id: number) => {
      const toggleCompleted = (prevTodos: Task[]) => prevTodos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
      setTodos((prevTodos) => ({ ...prevTodos, all: toggleCompleted(prevTodos.all) }));
    },
    [setTodos]
  );

  const handleDeleteTask = useCallback(
    (id: number, status: TaskStatuses) => {
      const deleteTask = (prevTodos: Task[]) => prevTodos.filter((t) => t.id !== id);
      setTodos((prevTodos) => ({ ...prevTodos, [status]: deleteTask(prevTodos[status]), all: deleteTask(prevTodos.all) }));
    },
    [setTodos]
  );

  const handleChangeStatus = useCallback(
    (status: TaskStatuses) => {
      switch (status) {
        case TaskStatus.ALL:
          setStatus(TaskStatus.ALL);
          break;
        case TaskStatus.ACTIVE: {
          const completedTasks = todos.all.filter((t) => !t.completed);
          setTodos((prevTodos) => ({ ...prevTodos, [status]: completedTasks }));
          setStatus(TaskStatus.ACTIVE);
          break;
        }
        case TaskStatus.COMPLETED: {
          const completedTasks = todos.all.filter((t) => t.completed);
          setTodos((prevTodos) => ({ ...prevTodos, [status]: completedTasks }));
          setStatus(TaskStatus.COMPLETED);
          break;
        }
        default:
          break;
      }
    },
    [todos.all, setTodos]
  );

  const changeMultiToggleTask = useCallback(
    (id: number, status: TaskStatuses) => {
      const deleteTask = (prevTodos: Task[]) => prevTodos.filter((t) => t.id !== id);
      const toggleCompleted = (prevTodos: Task[]) => prevTodos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));

      setTodos((prevTodos) => ({ ...prevTodos, [status]: deleteTask(prevTodos[status]), all: toggleCompleted(prevTodos.all) }));
    },
    [setTodos]
  );

  const handleClearCompleted = useCallback(() => {
    if (todos.all.some((t) => t.completed)) {
      const deleteTask = (prevTodos: Task[]) => prevTodos.filter((t) => !t.completed);
      setTodos((prevTodos) => ({ ...prevTodos, [status]: deleteTask(prevTodos[status]), all: deleteTask(prevTodos.all) }));
    }
  }, [todos.all, status, setTodos]);

  const handleAddTask = useCallback(
    (newValue: string) => {
      const newTask: Task = {
        id: new Date().getTime(),
        title: newValue,
        completed: false,
      };
      setTodos((prevTodos) => ({
        ...prevTodos,
        all: [...prevTodos.all, newTask],
      }));
    },
    [setTodos]
  );

  return (
    <div className='mt-10 w-[600px] bg-gray-100 p-10 rounded-lg shadow-md'>
      <InputTask addTask={handleAddTask} />
      <ul className='mt-3 h-[300px] max-h-[300px] overflow-y-auto'>
        {todos[status].length === 0 && <div className='text-2xl h-[300px] flex justify-center items-center'>No Tasks</div>}
        {todos[status].map((todo) => (
          <li key={todo.id} className='flex justify-between align-center mr-1.25 mb-2 border-b border-gray-300 pb-2'>
            <label className='flex items-center gap-1 cursor-pointer w-full'>
              {todo.completed ? <CompletedTaskIcon /> : <ActiveTaskIcon />}
              <input
                className='appearance-none'
                type='checkbox'
                checked={todo.completed}
                onChange={() => (status === TaskStatus.ALL ? handleToggleTask(todo.id) : changeMultiToggleTask(todo.id, status))}
              />
              <span className={`cursor-pointer text-lg truncate flex-1 ${todo.completed ? 'line-through opacity-50' : ''}`}>{todo.title}</span>
              <DeleteTaskIcon className='cursor-pointer' width={20} onClick={() => handleDeleteTask(todo.id, status)} />
            </label>
          </li>
        ))}
      </ul>

      <div className='flex justify-between mt-3'>
        <span>{todos.all.length} items left</span>
        <div className='flex gap-2'>
          {Object.keys(todos).map((key) => {
            return (
              <button
                className={`cursor-pointer px-2 border border-gray-200 rounded-md ${status === key ? 'border-gray-800 rounded-lg' : ''}`}
                key={key}
                onClick={() => handleChangeStatus(key as TaskStatuses)}
              >
                {key}
              </button>
            );
          })}
        </div>

        <button onClick={handleClearCompleted} className='cursor-pointer'>
          Clear completed
        </button>
      </div>
    </div>
  );
};
