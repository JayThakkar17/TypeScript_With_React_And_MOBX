import { createContext } from "react";
import { TodoStore } from "./TodoStore";

export const rootStoreContext = createContext({
  todoStore: new TodoStore()
});
