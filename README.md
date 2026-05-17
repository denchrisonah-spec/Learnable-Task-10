# Learnable Task 10 - TypeScript Todo List

This is a simple, robust, and type-safe Todo List application built using TypeScript. It demonstrates object-oriented programming concepts, TypeScript interfaces, custom types, and error handling.

## Features

The `TodoList` class supports the following operations:
- **Add Todo:** Add new tasks with an optional due date.
- **Complete Todo:** Mark existing tasks as completed.
- **Remove Todo:** Delete tasks by their unique ID.
- **List Todos:** Retrieve all tasks.
- **Filter Todos:** Filter tasks based on their status (`all`, `completed`, or `pending`).
- **Update Todo:** Update the description or due date of an existing task.
- **Clear Completed:** Remove all tasks that are marked as completed.
- **Robust Error Handling:** Handles cases like empty tasks or invalid IDs gracefully.

## Prerequisites

To run this code, you need to have Node.js installed along with TypeScript (`ts-node` is recommended for running `.ts` files directly).

```bash
npm install -g typescript ts-node
```

## How to Run

You can execute the file directly using `ts-node`:

```bash
ts-node todolists.ts
```

Alternatively, you can compile it to JavaScript and then run it using Node.js:

```bash
tsc todolists.ts
node todolists.js
```

## Usage

The `todolists.ts` file includes a demo at the bottom that showcases how to instantiate the `TodoList` class and utilize its various methods. Running the file will output the results to the console.
