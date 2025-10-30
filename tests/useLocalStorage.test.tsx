import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../src/shared/hooks/useLocalStorage';
import type { Task } from '../src/shared/types/todos';

type TodoListT = Task[];

const mockTodos: TodoListT = [{ id: 1, title: 'Test task', completed: false }];

describe('useLocalStorage (Vitest)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Использовать данные из localStorage', () => {
    localStorage.setItem('todos', JSON.stringify(mockTodos));

    const { result } = renderHook(() => useLocalStorage<TodoListT>('todos', []));

    expect(result.current[0]).toEqual(mockTodos);
  });

  it('Использовать initialValue, если localStorage пуст', () => {
    const { result } = renderHook(() => useLocalStorage<TodoListT>('todos', mockTodos));

    expect(result.current[0]).toEqual(mockTodos);
  });

  it('Обновлять localStorage при изменении значения', () => {
    const { result } = renderHook(() => useLocalStorage<TodoListT>('todos', []));

    const newTodos = [{ id: 2, title: 'New Task', completed: true }];

    act(() => {
      result.current[1](newTodos);
    });

    expect(result.current[0]).toEqual(newTodos);
    expect(JSON.parse(localStorage.getItem('todos')!)).toEqual(newTodos);
  });
});
