export interface Todo {
    id: string
    title: string
    completed: boolean
}

export interface EditModalStateProps {
    open: boolean
    edit: Todo | null
}
