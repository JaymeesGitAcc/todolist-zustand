import { Modal, Space } from "antd"
import React from "react"
import { Todo } from "../types/todolist.types"

interface DeleteModalProps {
    open: boolean
    handleOk: () => void
    handleCancel: () => void
    todo: Todo | null
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    open,
    handleOk,
    handleCancel,
    todo,
}) => {
    return (
        <Modal
            title="Delete this Todo?"
            centered
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Yes"
        >
            <Space size="small" direction="vertical">
                <p>Title: {todo?.title}</p>
                <p>ID: {todo?.id}</p>
                <p>Status: {todo?.completed ? "completed" : "not-completed"}</p>
            </Space>
        </Modal>
    )
}

export default DeleteModal
