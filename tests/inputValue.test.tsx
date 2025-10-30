import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import InputTask from '../src/modules/input-todo'; // путь подкорректируй под свой проект

describe('InputTask', () => {
  it('should update input value', () => {
    render(<InputTask addTask={vi.fn()} />);

    const input = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'Сделать задание' } });

    expect(input).toHaveValue('Сделать задание');
  });
});
