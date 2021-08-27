import React, { useState } from "react";
import { StyledTodoItem } from "./styles";
import { Button, Checkbox, IconButton, TextField } from "@material-ui/core";
import { ITodo } from "../../stores/TodoStore";
import { useStores } from "../../use-stores";
import { observer } from "mobx-react-lite";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FlexContainer from "../FlexContainer";

interface IProps {
  todo: ITodo;
}

const TodoItem = observer(({ todo }: IProps) => {
  const [editMode, setEditMode] = useState(false);
  const [formValue, setFormvalue] = useState(todo.text);
  const { todoStore } = useStores();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = {
      ...todo,
      text: formValue
    };
    todoStore.updateTodo(newTodo);
    setEditMode(false);
  };

  return (
    <StyledTodoItem>
      <FlexContainer>
        <Checkbox
          checked={todo.completed}
          onChange={() => todoStore.toggleCompleted(todo.id)}
        />
        {!editMode && <div onClick={() => setEditMode(true)}>{todo.text}</div>}
        {editMode && (
          <form action="" onSubmit={handleSubmit}>
            <TextField
              style={{ marginRight: 10 }}
              value={formValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormvalue(e.target.value)
              }
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginRight: 10 }}
            >
              Save
            </Button>
            <Button type="button" onClick={() => setEditMode(false)}>
              cancel
            </Button>
          </form>
        )}
      </FlexContainer>

      <div>
        <IconButton onClick={() => setEditMode(!editMode)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => todoStore.deleteTodo(todo.id)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </StyledTodoItem>
  );
});

export default TodoItem;
