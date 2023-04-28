export async function getTodoList(owner) {
  try {
    const request = await fetch(
      `https://react-api-4721a-default-rtdb.firebaseio.com/tasks.json`
    );
    const data = await request.json();
    const loadedTasks = [];
    for (const taskKey in data) {
      loadedTasks.push({
        id: taskKey,
        name: data[taskKey].name,
        owner: data[taskKey].owner,
        done: data[taskKey].done,
      });
    }
    return loadedTasks;
  } catch (error) {
    console.error(error);
  }
}

export async function createTodoItem({ owner, name }) {
  try {
    const response = await fetch(
      "https://react-api-4721a-default-rtdb.firebaseio.com/tasks.json",
      {
        method: "POST",
        body: JSON.stringify({
          name,
          owner,
          done: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    const id = data.name;
    return { id, name, owner, done: false };
  } catch (error) {
    console.error(error);
  }
}

export async function switchTodoItemDone({ todoItem }) {
  todoItem.done = !todoItem.done;
  try {
    await fetch(
      `https://react-api-4721a-default-rtdb.firebaseio.com/tasks/${todoItem.id}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({ done: todoItem.done }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
}

export function deleteTodoItem({ element, todoItem }) {
  if (confirm("Are You sure?")) {
    try {
      element.remove();
      fetch(
        `https://react-api-4721a-default-rtdb.firebaseio.com/tasks/${todoItem.id}.json`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
