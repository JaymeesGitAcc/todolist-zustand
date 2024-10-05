import { Button, Flex, Input, Space, Typography } from "antd"
import { FC, useEffect, useState } from "react"
import useTodoStore from "./store/todoStore"
import { EditValueProps, Todo } from "./types/todolist.types"
import toast, { Toaster } from "react-hot-toast"
import DeleteModal from "./components/DeleteModal"
import ShowList from "./components/ShowList"

const App: FC = () => {
    const [todoInput, setTodoInput] = useState("")
    const [editingValue, setEditingValue] = useState<null | EditValueProps>(
        null
    )
    const { list, addTodo, updateTodo, deleteTodo } = useTodoStore(
        (state) => state
    )
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [removeTodo, setRemoveTodo] = useState<Todo | null>(null)

    const showModal = (todo: Todo) => {
        setIsModalOpen(true)
        setRemoveTodo(todo)
        setTodoInput("")
        setEditingValue(null)
    }

    const handleOk = () => {
        if (removeTodo) {
            deleteTodo(removeTodo.id)
            showToast("Deleted sucessfully!", "success")
        }
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        setRemoveTodo(null)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (todoInput && !editingValue) {
            const value = {
                id: crypto.randomUUID(),
                title: todoInput,
                completed: false,
            }
            addTodo(value)
            showToast("Added to the list!", "success")
        } else if (todoInput && editingValue) {
            updateTodo({
                id: editingValue.id,
                title: todoInput,
            })
            setEditingValue(null)
            showToast("Saved Successfully!", "success")
        } else {
            showToast("Enter something!", "error")
        }
        setTodoInput("")
    }

    const showToast = (
        message: string,
        type: string,
        duration: number = 2000
    ) => {
        toast.dismiss()
        if (type === "success") {
            toast.success(message, { duration: duration })
        } else if (type === "error") {
            toast.error(message, { duration: duration })
        }
    }

    useEffect(() => {
        localStorage.setItem("ts-zustand-todos", JSON.stringify(list))
    }, [list])

    return (
        <Flex
            justify="center"
            className="min-h-screen bg-[#494949] p-2 md:items-center"
        >
            <Toaster />
            <div className="bg-white p-4 rounded-lg md:w-[500px]">
                <Typography.Title level={3}>My Todos</Typography.Title>
                <form onSubmit={handleSubmit}>
                    <Space.Compact size="large" style={{ width: "100%" }}>
                        <Input
                            value={todoInput}
                            onChange={(e) => setTodoInput(e.target.value)}
                            placeholder="wash car, buy eggs..."
                        />
                        <Button type="primary" htmlType="submit">
                            {!editingValue ? "Add" : "Save"} Todo
                        </Button>
                    </Space.Compact>
                </form>
                <ShowList {...{ setEditingValue, showModal, setTodoInput }} />
            </div>
            <DeleteModal
                open={isModalOpen}
                handleCancel={handleCancel}
                handleOk={handleOk}
                todo={removeTodo}
            />
        </Flex>
    )
}

export default App
