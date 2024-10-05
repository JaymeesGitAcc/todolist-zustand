export interface Todo {
    id: string
    title: string
    completed: boolean
}

export interface EditValueProps {
    id: string
    title: string
}

export interface ShowListProps {
    setEditingValue: (props: EditValueProps) => void
    setTodoInput: (state: string) => void
    showModal: (todo: Todo) => void
}
