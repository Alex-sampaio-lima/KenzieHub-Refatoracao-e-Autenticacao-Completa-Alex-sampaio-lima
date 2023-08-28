import { useEffect, useState } from "react"
import { createContext } from "react"
import { api } from "../services/api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export const TodoContext = createContext({})

export const TodoProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("@TOKEN")
            if (token) {
                try {
                    const { data } = await api.get("/profile", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    setUser(data)
                    navigate("/dashboard")
                } catch (error) {
                    console.error(error)
                    localStorage.removeItem("@TOKEN")
                    localStorage.removeItem("@USERID")
                    localStorage.removeItem("@NAMEUSER")
                    navigate("/")
                }
            }
        }
        loadUser()
    }, [])

    const userRegister = async (formData) => {
        try {
            const { data } = await api.post("/users", formData)
            toast.success("Conta criada com sucesso!")
            navigate("/")
        } catch (error) {
            if (error.response?.data) {
                toast.error("Ops! Algo deu errado")
            }
            toast.error(error)
        }
    }

    const userLogin = async (formData) => {
        try {
            const { data } = await api.post("/sessions", formData)
            localStorage.setItem("@TOKEN", data.token)
            localStorage.setItem("@USERID", data.user.id)
            localStorage.setItem("@NAMEUSER", data.user.name)
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
        localStorage.removeItem("@NAMEUSER")
        setUser(null)
        navigate("/")
    }
    console.log(user)
    return (
        <TodoContext.Provider value={{ user, userLogin, userRegister, userLogout }}>
            {children}
        </TodoContext.Provider>
    )
}
