import { useContext } from "react"
import { TodoContext } from "../providers"
import { Navigate, Outlet } from "react-router-dom"


export const ProtectedRoutes = () => {
    const { user } = useContext(TodoContext)

    return user ? <Outlet /> : <Navigate to="/" />
}