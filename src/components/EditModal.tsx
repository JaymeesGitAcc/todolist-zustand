import { Input, Modal } from "antd"
import React from "react"
import { EditModalStateProps, Todo } from "../types/todolist.types"
// import { EditModalStateProps, Todo } from "../types/todolist.types"

interface EditModalProps {
    open: boolean
    okText?: string
    closeModal: () => void
}

const EditModal: React.FC<EditModalProps> = ({
    open,
    okText = "Save",
    closeModal,
}) => {
    // const [input, setInput] = useState(editValue?.title)

    return (
        <Modal
            centered
            open={open}
            okText={okText}
            // onOk={() => setOpen({})}
            onCancel={closeModal}
        >
            {/* <p>{editValue?.title}</p> */}
            {/* <Input value={editValue.title} /> */}
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
        </Modal>
    )
}

export default EditModal
