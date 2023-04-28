let tasks = [];


function createAppTitle(title) {
  const appTitle = document.createElement('h2');
  appTitle.innerHTML = title;
  return appTitle;
}

function createTodoItemForm() {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const buttonWrapper = document.createElement('div');
  const button = document.createElement('button');

  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Input a task name';
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Add a task';
  button.setAttribute('disabled', 'disabled');

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  return {
    form,
    input,
    button,
  };
}

function createTodoList() {
  const list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
}

function createTodoItemElement(todoItem, { onDone, onDelete }) {
  const item = document.createElement('li');
  const buttonGroup = document.createElement('div');
  const doneButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const doneClass = 'list-group-item-success';

  item.classList.add(
    'list-group-item',
    'd-flex',
    'justify-content-between',
    'align-item-center',
  );

  if (todoItem.done) {
    item.classList.add(doneClass);
  }

  item.setAttribute('id', todoItem.id);
  item.textContent = todoItem.name;

  buttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.insertAdjacentHTML(
    'afterbegin',
    '<img src="done.svg" alt="Done" width=20>',
  );
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.insertAdjacentHTML(
    'afterbegin',
    '<img src="delete.svg" alt="Done" width=20>',
  );

  doneButton.addEventListener('click', () => {
    onDone({
      todoItem,
      element: item,
    });
    item.classList.toggle(doneClass, todoItem.done);
  });

  deleteButton.addEventListener('click', () => {
    onDelete({
      todoItem,
      element: item,
    });
  });

  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  return {
    item,
    tasks,
  };
}

async function createTodoApp(container, {
  title = 'ToDo App',
  owner,
  todoItemList = [],
  onCreateFormSubmit,
  onDoneClick,
  onDeleteClick,
}) {
  const todoAppTitle = createAppTitle(title);
  const todoItemForm = createTodoItemForm();
  const todoList = createTodoList();
  const handlers = { onDone: onDoneClick, onDelete: onDeleteClick };

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);
  if (todoItemList){
    todoItemList.forEach((todoItem) => {
      const todoItemElement = createTodoItemElement(todoItem, handlers);
      todoList.append(todoItemElement.item);
    });
  }

  todoItemForm.form.addEventListener('input', () => {
    if (todoItemForm.input.value) {
      todoItemForm.button.removeAttribute('disabled', null);
    } else {
      todoItemForm.button.setAttribute('disabled', 'disabled');
    }
  });

  todoItemForm.form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!todoItemForm.input.value) {
      return;
    }

    const todoItem = await onCreateFormSubmit({
      owner,
      name: todoItemForm.input.value.trim(),
    });

    const todoItemElement = createTodoItemElement(todoItem, handlers);

    todoList.append(todoItemElement.item);

    todoItemForm.input.value = '';
    todoItemForm.button.setAttribute('disabled', 'disabled');
    return todoItemElement;
  });
}

export { createTodoApp };
