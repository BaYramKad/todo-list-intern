import React, { useState, type FC } from 'react';
import { AddTaskIcon } from '../../shared/ui/icons/add';

interface InputTaskProps {
  addTask: (task: string) => void;
}

const InputTask: FC<InputTaskProps> = ({ addTask }) => {
  const [value, setValue] = useState<string>('');

  console.log('render input');

  const handleAddTask = () => {
    if (value.trim() === '') {
      alert('Please enter a task');
      return;
    }

    addTask(value);
    setValue('');
  };
  return (
    <div className='color-white flex items-center gap-2'>
      <input
        className='italic border border-gray-400 rounded-md p-2 w-full'
        type='text'
        placeholder='What needs to be done?'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
      />
      <AddTaskIcon className='cursor-pointer' onClick={handleAddTask} />
    </div>
  );
};

export default React.memo(InputTask);
