import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCallback } from 'react';
import { Task } from '../src/shared/types/todos';

type Todos = {
  all: Task[];
};

const useToggleTask = (setTodos: React.Dispatch<React.SetStateAction<Todos>>) =>
  useCallback(
    (id: number) => {
      const toggleCompleted = (prevTodos: Task[]) => prevTodos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));

      setTodos((prevTodos) => ({
        ...prevTodos,
        all: toggleCompleted(prevTodos.all),
      }));
    },
    [setTodos]
  );

describe('handleToggleTask', () => {
  it('Инвертировать completed у задачи с заданным id', () => {
    const initialTodos: Todos = {
      all: [
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: true },
      ],
    };

    const setTodos = vi.fn((updater: (prev: Todos) => Todos) => {
      const updated = updater(initialTodos);
      expect(updated.all).toEqual([
        { id: 1, title: 'Task 1', completed: true },
        { id: 2, title: 'Task 2', completed: true },
      ]);
    });

    const { result } = renderHook(() => useToggleTask(setTodos as React.Dispatch<React.SetStateAction<Todos>>));

    result.current(1);

    expect(setTodos).toHaveBeenCalledOnce();
  });
});
