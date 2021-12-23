const express = require("express");
const cors = require("cors");

const { v4: uuidv4, validate } = require("uuid");

const app = express();
app.use(express.json());
app.use(cors());

const users = [];

/** Middlewares */

function checksExistsUserAccount(request, response, next) {
  // Complete aqui
}

function checksCreateTodosUserAvailability(request, response, next) {
  // Complete aqui
}

function checksTodoExists(request, response, next) {
  // Complete aqui
}

function findUserById(request, response, next) {
  // Complete aqui
}

/** Routes Users */

app.post("/users", (request, response) => {
  // Complete aqui
});

app.get("/users/:id", findUserById, (request, response) => {
  // Complete aqui
});

app.patch("/users/:id/pro", findUserById, (request, response) => {
  // Complete aqui
});

/** Routes Users TODOS */

app.get("/todos", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.post(
  "/todos",
  checksExistsUserAccount,
  checksCreateTodosUserAvailability,
  (request, response) => {
    // Complete aqui
  }
);

app.put("/todos/:id", checksTodoExists, (request, response) => {
  // Complete aqui
});

app.patch("/todos/:id/done", checksTodoExists, (request, response) => {
  // Complete aqui
});

app.delete(
  "/todos/:id",
  checksExistsUserAccount,
  checksTodoExists,
  (request, response) => {
    // Complete aqui
  }
);

module.exports = {
  app,
  users,
  checksExistsUserAccount,
  checksCreateTodosUserAvailability,
  checksTodoExists,
  findUserById,
};
