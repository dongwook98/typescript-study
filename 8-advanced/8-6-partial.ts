{
  type ToDo = {
    title: string;
    description: string;
    label: string;
    priority: 'high' | 'low';
  };

  function updateTodo(todo: ToDo, filedsToUpdate: Partial<ToDo>): ToDo {
    return { ...todo, ...filedsToUpdate };
  }
  const todo: ToDo = {
    title: 'learn typescript',
    description: 'study hard',
    label: 'study',
    priority: 'high',
  };
  const updated = updateTodo(todo, { priority: 'low' });
  console.log(updated);
}
