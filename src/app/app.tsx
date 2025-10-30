import { TodoList } from '../modules/todo-list';

export const App = () => {
  return (
    <main className='flex flex-col justify-center items-center h-screen content-center bg-blue-100'>
      <h1 className='font-bold text-3xl'>Todo List</h1>
      <TodoList />
    </main>
  );
};
