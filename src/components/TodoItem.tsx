import { Button, Checkbox, Flex, Typography } from "antd"
import React from "react"
import useTodoStore from "../store/todoStore"
import { EditValueProps, Todo } from "../types/todolist.types"

interface TodoItemProps {
    todo: Todo
    setEditingValue: (val: EditValueProps) => void
    setTodoInput: (val: string) => void
    showModal: (todo: Todo) => void
}

const TodoItem: React.FC<TodoItemProps> = ({
    todo,
    setEditingValue,
    setTodoInput,
    showModal,
}) => {
    const changeCompleted = useTodoStore((state) => state.changeCompleted)

    const handleChange = (todoid: string) => {
        changeCompleted(todoid)
    }
    return (
        <Flex key={todo.id} align="center">
            <Checkbox
                checked={todo.completed}
                onChange={() => handleChange(todo.id)}
            >
                <Typography.Text
                    style={{
                        fontSize: "17px",
                        textDecoration: todo.completed
                            ? "line-through"
                            : undefined,
                    }}
                >
                    {todo.title}
                </Typography.Text>
            </Checkbox>

            <Flex
                gap={10}
                style={{
                    marginLeft: "auto",
                    marginBlock: "10px",
                }}
            >
                <Button
                    color="primary"
                    variant="solid"
                    onClick={() => {
                        setTodoInput(todo.title)
                        setEditingValue({
                            id: todo.id,
                            title: todo.title,
                        })
                    }}
                    disabled={todo.completed}
                >
                    Edit
                </Button>
                <Button
                    color="danger"
                    variant="solid"
                    onClick={() => showModal(todo)}
                >
                    Del
                </Button>
            </Flex>
        </Flex>
    )
}

export default TodoItem
