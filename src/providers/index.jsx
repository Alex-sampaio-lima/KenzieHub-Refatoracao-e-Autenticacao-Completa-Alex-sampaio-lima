import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { api } from "../services/api"

export const TodoContext = createContext({})

export const TodoProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const navigate = useNavigate()

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

    const submitLogin = (formData) => {
        userLogin(formData)
    }

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

    const submitRegister = (formData) => {
        userRegister(formData)
    }

    const userLogout = () => {
        localStorage.removeItem("@TOKEN")
        localStorage.removeItem("@USERID")
        setUser(null)
        navigate("/")
    }

    const options = [
        { value: "", label: "-- Selecione um Módulo --" },
        { value: "primeroModulo", label: "Primeiro módulo (Introdução ao Frontend)" },
        { value: "segundoModulo", label: "Segundo módulo (Frontend Avançado)" },
        { value: "terceiroModulo", label: "Terceiro módulo (Introdução ao Backend)" },
        { value: "quartoModulo", label: "Quarto módulo (Backend Avançado)" }
    ]

    return (
        <TodoContext.Provider value={{ user, submitLogin, userLogin, submitRegister, options, userLogout }}>
            {children}
        </TodoContext.Provider>
    )
}