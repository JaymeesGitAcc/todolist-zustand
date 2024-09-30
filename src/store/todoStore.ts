import { create } from "zustand"
import { EditValueProps, Todo } from "../types/todolist.types"

const localStorageData = JSON.parse(
    localStorage.getItem("ts-zustand-todos") || "[]"
)

export interface TodoStoreProps {
    list: Todo[]
    addTodo: (payload: Todo) => void
    changeCompleted: (id: string) => void
    updateTodo: (payload: EditValueProps) => void
    deleteTodo: (id: string) => void
}

const useTodoStore = create<TodoStoreProps>((set) => ({
    list: localStorageData,
    addTodo: (payload) => set((state) => ({ list: [...state.list, payload] })),
    changeCompleted: (id) =>
        set((state) => ({
            list: state.list.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
        })),
    updateTodo: (payload) =>
        set((state) => ({
            list: state.list.map((todo) =>
                todo.id === payload.id
                    ? { ...todo, title: payload.title }
                    : todo
            ),
        })),
    deleteTodo: (id) =>
        set((state) => ({ list: state.list.filter((todo) => todo.id !== id) })),
}))

export default useTodoStore
