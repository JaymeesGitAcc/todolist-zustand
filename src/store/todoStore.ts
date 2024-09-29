import { create } from "zustand"
import { Todo } from "../types/todolist.types"

export interface TodoStoreProps {
    list: Todo[]
    addTodo: (payload: Todo) => void
    changeCompleted: (id: string) => void
    updateTodo: (payload: Todo) => void
}

const useTodoStore = create<TodoStoreProps>((set) => ({
    list: [],
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
}))

export default useTodoStore
