const express = require("express");
const cors = require("cors");

const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find((user) => user.username === username);

  if (!user) {
    return response.status(404).json({ error: "User not found" });
  }

  request.user = user;

  return next();
}

function checksExistsTodo(request, response, next) {
  const { user } = request;
  const { id } = request.params;

  const todoIndex = user.todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return response.status(404).json({ error: "Todo not found" });
  }

  request.todoIndex = todoIndex;

  return next();
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;

  if (!name || !username) {
    return response
      .status(400)
      .json({ error: "Name and Username properties cannot be empty" });
  }

  const isUsernameValid = users.some((user) => user.username === username);

  if (isUsernameValid) {
    return response.status(400).json({ error: "Username already exists" });
  }

  const newUser = {
    id: uuidv4(),
    name,
    username,
    todos: [],
  };

  users.push(newUser);

  return response.status(201).json(newUser);
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const { user } = request;

  return response.json(user.todos);
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { title, deadline } = request.body;

  if (!title || !deadline) {
    return response
      .status(400)
      .json({ error: "Title and deadline properties cannot be empty" });
  }

  const newTodo = {
    title,
    id: uuidv4(),
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  };

  user.todos.push(newTodo);

  return response.status(201).json(newTodo);
});

app.put(
  "/todos/:id",
  checksExistsUserAccount,
  checksExistsTodo,
  (request, response) => {
    const { user, todoIndex } = request;
    const { deadline, title } = request.body;

    if (!title || !deadline) {
      return response
        .status(400)
        .json({ error: "Title and deadline properties cannot be empty" });
    }

    const updatedTudo = {
      ...user.todos[todoIndex],
      deadline,
      title,
    };

    user.todos[todoIndex] = updatedTudo;

    return response.json(updatedTudo);
  }
);

app.patch(
  "/todos/:id/done",
  checksExistsUserAccount,
  checksExistsTodo,
  (request, response) => {
    const { user, todoIndex } = request;

    user.todos[todoIndex].done = true;

    return response.json(user.todos[todoIndex]);
  }
);

app.delete(
  "/todos/:id",
  checksExistsUserAccount,
  checksExistsTodo,
  (request, response) => {
    const { user, todoIndex } = request;

    user.todos.splice(todoIndex, 1);

    return response.status(204).send();
  }
);

module.exports = app;
