import { Todo } from "./Todo"
// 把todos写入浏览器缓存中
export function saveStorage(todos: Todo[]) {
    localStorage.setItem("todos_key", JSON.stringify(todos))
}
// 把todos读取出来
export function readStorage(): Todo[] {
    return JSON.parse(localStorage.getItem("todos_key") || "[]")
}