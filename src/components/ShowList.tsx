import TodoItem from "./TodoItem"
import { Typography } from "antd"
import { ShowListProps, Todo } from "../types/todolist.types"
import useTodoStore from "../store/todoStore"
import { FC } from "react"

const ShowList: FC<ShowListProps> = ({
    setEditingValue,
    setTodoInput,
    showModal,
}) => {
    const list = useTodoStore((state) => state.list)
    return (
        <div>
            {list.map((todo: Todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    setEditingValue={setEditingValue}
                    setTodoInput={setTodoInput}
                    showModal={showModal}
                />
            ))}
            {!list.length && (
                <Typography
                    style={{
                        textAlign: "center",
                        marginBlock: "10px",
                        color: "rgba(0, 0, 0, 0.24)",
                    }}
                >
                    ---List is empty---
                </Typography>
            )}
        </div>
    )
}

export default ShowList
