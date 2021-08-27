import React, { useState } from "react";
import { Modal, Button, TextField } from "@material-ui/core";
import { ModalContent } from "./styles";
import { useStores } from "../../use-stores";

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ModalNewTodo = ({ isOpen, closeModal }: IProps) => {
  const [text, setText] = useState("");
  const { todoStore } = useStores();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    todoStore.addTodo(newTodo);
    closeModal();
  };

  return (
    <Modal aria-labelledby="modal-new-todo" open={isOpen} onClose={closeModal}>
      <ModalContent>
        <h2 id="modal-new-todo">Add new Todo</h2>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            id="standard-basic"
            autoFocus
            label="Todo"
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />
          <Button
            disabled={text.length === 0}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
          >
            Submit
          </Button>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ModalNewTodo;
