// ─────────────────────────────────────────────
//  Interfaces & Types
// ─────────────────────────────────────────────

interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
  dueDate?: Date;
}

type FilterStatus = "all" | "completed" | "pending";

// ─────────────────────────────────────────────
//  TodoList Class
// ─────────────────────────────────────────────

class TodoList {
  private todos: TodoItem[] = [];
  private nextId: number = 1;

  // ── Add ──────────────────────────────────────

  addTodo(task: string, dueDate?: Date): void {
    if (!task.trim()) {
      throw new Error("Task description cannot be empty.");
    }

    this.todos.push({
      id: this.nextId++,
      task: task.trim(),
      completed: false,
      dueDate,
    });
  }

  // ── Complete ─────────────────────────────────

  completeTodo(id: number): void {
    const todo = this.findById(id);
    todo.completed = true;
  }

  // ── Remove ───────────────────────────────────

  removeTodo(id: number): void {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error(`Todo with id ${id} not found.`);
    }
    this.todos.splice(index, 1);
  }

  // ── List / Filter ────────────────────────────

  listTodos(): TodoItem[] {
    return [...this.todos];
  }

  filterTodos(status: FilterStatus): TodoItem[] {
    if (status === "completed") return this.todos.filter((t) => t.completed);
    if (status === "pending")   return this.todos.filter((t) => !t.completed);
    return [...this.todos];
  }

  // ── Update ───────────────────────────────────

  updateTodo(id: number, updates: Partial<Pick<TodoItem, "task" | "dueDate">>): void {
    const todo = this.findById(id);

    if (updates.task !== undefined) {
      if (!updates.task.trim()) {
        throw new Error("Task description cannot be empty.");
      }
      todo.task = updates.task.trim();
    }

    if (updates.dueDate !== undefined) {
      todo.dueDate = updates.dueDate;
    }
  }

  // ── Clear Completed ──────────────────────────

  clearCompleted(): void {
    this.todos = this.todos.filter((t) => !t.completed);
  }

  // ── Private Helpers ──────────────────────────

  private findById(id: number): TodoItem {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      throw new Error(`Todo with id ${id} not found.`);
    }
    return todo;
  }
}

// ─────────────────────────────────────────────
//  Demo
// ─────────────────────────────────────────────

const list = new TodoList();

list.addTodo("Buy groceries", new Date("2026-05-20"));
list.addTodo("Read TypeScript handbook");
list.addTodo("Write unit tests", new Date("2026-05-18"));
list.addTodo("Review pull request");

console.log("── All todos ──────────────────────────────");
console.table(list.listTodos());

list.completeTodo(1);
list.completeTodo(3);

console.log("\n── After completing #1 & #3 ───────────────");
console.table(list.listTodos());

console.log("\n── Pending only ───────────────────────────");
console.table(list.filterTodos("pending"));

console.log("\n── Completed only ─────────────────────────");
console.table(list.filterTodos("completed"));

list.updateTodo(2, { task: "Read TypeScript handbook (chapters 1–5)" });
console.log("\n── After updating task #2 ─────────────────");
console.table(list.listTodos());

list.clearCompleted();
console.log("\n── After clearing completed ────────────────");
console.table(list.listTodos());

list.removeTodo(2);
console.log("\n── After removing #2 ──────────────────────");
console.table(list.listTodos());

// Error handling demo
try {
  list.completeTodo(999);
} catch (err) {
  console.error("\n[Error caught]", (err as Error).message);
}

try {
  list.addTodo("   ");
} catch (err) {
  console.error("[Error caught]", (err as Error).message);
}
