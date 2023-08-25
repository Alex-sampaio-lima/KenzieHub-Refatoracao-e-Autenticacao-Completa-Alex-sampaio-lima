import { useState } from "react"
import { createContext } from "react"
import { api } from "../services/api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export const TodoContext = createContext({})

export const TodoProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    const userRegister = async (formData) => {
        try {
            const { data } = await api.post("/users", formData)
            toast.success("Conta criada com sucesso!")
            navigate("/")
        } catch (error) {
            if (error.response?.data) {
                toast.warn("Ops! Algo deu errado")
            }
            toast.error(error)
        }
    }

    const userLogin = async (formData) => {
        try {
            const { data } = await api.post("/sessions", formData)
            localStorage.setItem("@TOKEN", data.token)
            localStorage.setItem("@USERID", data.user.id)
            toast.success("Login realizado com sucesso!")
            setUser(data.user)
            navigate("/dashboard")
        } catch (error) {
            console.error(error)
            toast.error("Erro ao realizar login !")
        }
    }

    const userLogout = () => {
        localStorage.removeItem("@TOKEN")
        localStorage.removeItem("@USERID")
        setUser(null)
        navigate("/")
    }

    return (
        <TodoContext.Provider value={{ user, userLogin, userRegister, userLogout }}>
            {children}
        </TodoContext.Provider>
    )
}
