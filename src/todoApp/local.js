let tasks = [];

export function getTodoListLocal(owner) {
  tasks = JSON.parse(localStorage.getItem(owner));
  if (!tasks) {tasks = []}
  return tasks
}

export function createTodoItemLocal({ owner, name }) {
  let newTask = {"owner":owner,"name":name,"done":false,"id":Date.now()};
  tasks.push(newTask);
  localStorage.setItem(owner, JSON.stringify(tasks));
  return newTask
}

export function switchTodoItemDoneLocal({todoItem}) {
  todoItem.done = !todoItem.done;
  localStorage.setItem(todoItem.owner, JSON.stringify(tasks));
}

export function deleteTodoItemlocal({ element, todoItem }) {
  const index = tasks.findIndex((task) => task.id === todoItem.id);
  if (confirm('Are You sure?')) {
    element.remove();
    tasks.splice(index, 1);
    localStorage.setItem(todoItem.owner, JSON.stringify(tasks));
  }
}

export { tasks };
