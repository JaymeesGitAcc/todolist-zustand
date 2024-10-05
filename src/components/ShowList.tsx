import TodoItem from "./TodoItem"
import { Button, Modal, Typography } from "antd"
import { ShowListProps, Todo } from "../types/todolist.types"
import useTodoStore from "../store/todoStore"
import { FC, useState } from "react"
import toast, { Toaster } from "react-hot-toast"

const ShowList: FC<ShowListProps> = ({
    setEditingValue,
    setTodoInput,
    showModal,
}) => {
    const [showDeleteAllModal, setShowDeleteAllModal] = useState(false)

    const list = useTodoStore((state) => state.list)
    const deleteAll = useTodoStore((state) => state.deleteAll)

    const handleDeleteAll = () => {
        deleteAll()
        toast.success("All Items deleted!", { duration: 2000 })
        setShowDeleteAllModal(false)
    }

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
            {!list.length ? (
                <Typography
                    style={{
                        textAlign: "center",
                        marginBlock: "10px",
                        color: "rgba(0, 0, 0, 0.24)",
                    }}
                >
                    ---List is empty---
                </Typography>
            ) : (
                <Button
                    variant="dashed"
                    color="primary"
                    style={{ display: "block", margin: "0px auto" }}
                    onClick={() => setShowDeleteAllModal(true)}
                >
                    Delete All
                </Button>
            )}
            <Modal
                open={showDeleteAllModal}
                onCancel={() => setShowDeleteAllModal(false)}
                onOk={handleDeleteAll}
                okText="Yes"
                centered
            >
                <Typography style={{ fontSize: "22px" }}>
                    Delete all {list.length} items?
                </Typography>
            </Modal>
            <Toaster />
        </div>
    )
}

export default ShowList
