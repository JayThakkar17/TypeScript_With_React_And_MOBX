import { decorate, observable, computed } from 'mobx';
import { toast } from 'react-toastify';

export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

export class TodoStore {
  public todos: ITodo[] = [{ id: 1, text: 'Mobx', completed: false }];

  public addTodo = (todo: ITodo) => {
    this.todos.push(todo);
    toast.success('New Todo added', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  public toggleCompleted = (id: number) => {
    const updatedTodos = this.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.todos = updatedTodos;
  };

  public updateTodo = (updatedTodo: ITodo) => {
    const updatedTodos = this.todos.map((todo) => {
      if (todo.id === updatedTodo.id) {
        return { ...updatedTodo };
      }
      return todo;
    });
    this.todos = updatedTodos;
  };

  public deleteTodo = (id: number) => {
    const updatedTodos = this.todos.filter((todo) => todo.id !== id);
    this.todos = updatedTodos;
    toast.info('Todo deleted', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  get todoProgress() {
    const completedCount = this.todos.filter((t) => t.completed).length;
    const totalCount = this.todos.length;
    return `${completedCount} / ${totalCount}`;
  }

  get completedTodos() {
    return this.todos.filter((todo) => todo.completed);
  }

  get incompleteTodos() {
    return this.todos.filter((todo) => !todo.completed);
  }
}

decorate(TodoStore, {
  todos: observable,
  todoProgress: computed,
  completedTodos: computed,
  incompleteTodos: computed,
});
