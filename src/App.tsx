import { Button, Flex, Input, Space, Typography } from "antd"
import { CSSProperties, FC, useEffect, useState } from "react"
import useTodoStore from "./store/todoStore"
import { Todo } from "./types/todolist.types"
import TodoItem from "./components/TodoItem"

const containerStyle: CSSProperties = {
    minHeight: "100vh",
    backgroundColor: "#494949",
}

const formContainerStyle: CSSProperties = {
    width: "500px",
    minHeight: "200px",
    padding: "22px",
    borderRadius: "10px",
    backgroundColor: "#fff",
}

const App: FC = () => {
    const [todoInput, setTodoInput] = useState("")

    const { list, addTodo } = useTodoStore((state) => state)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // console.log(todoInput)
        if (todoInput) {
            const value = {
                id: crypto.randomUUID(),
                title: todoInput,
                completed: false,
            }

            addTodo(value)
        }
        setTodoInput("")
    }

    useEffect(() => {
        console.log(list)
    }, [list])

    return (
        <Flex style={containerStyle} justify="center" align="center">
            <div style={formContainerStyle}>
                <Typography.Title level={3}>My Todos</Typography.Title>
                <form onSubmit={handleSubmit}>
                    <Space.Compact size="large" style={{ width: "100%" }}>
                        <Input
                            value={todoInput}
                            onChange={(e) => setTodoInput(e.target.value)}
                            placeholder="wash car, buy eggs..."
                        />
                        <Button type="primary">Add Todo</Button>
                    </Space.Compact>
                </form>
                <div>
                    {list.map((todo: Todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </div>
            </div>
        </Flex>
    )
}

export default App
