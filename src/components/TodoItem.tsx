import { Button, Checkbox, Flex, Typography } from "antd"
import React from "react"
import useTodoStore from "../store/todoStore"
import { Todo } from "../types/todolist.types"
// import { EditModalStateProps } from "../App"

interface TodoItemProps {
    todo: Todo
    openEditModal: () => void
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, openEditModal }) => {
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
                <Button color="primary" variant="solid" onClick={openEditModal}>
                    Edit
                </Button>
                <Button color="danger" variant="solid">
                    Del
                </Button>
            </Flex>
        </Flex>
    )
}

export default TodoItem
