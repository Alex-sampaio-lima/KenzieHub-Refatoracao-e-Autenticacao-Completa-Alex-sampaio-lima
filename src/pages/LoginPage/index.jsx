import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../components/Input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "../../services/api"
import { loginShema } from "./loginSchema"
import { toast } from "react-toastify"
import LogoKenzieHub from "../../assets/LogoKenzieHub.svg"
import style from "./style.module.scss"

export const LoginPage = () => {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginShema)
    })

    const userLogin = async (formData) => {
        try {
            const { data } = await api.post("/sessions", formData)
            toast.success("Login realizado com sucesso!")
            navigate("/dashboard")
        } catch (error) {
            toast.error("Erro ao realizar login !")
        }
    }

    const submit = (formData) => {
        userLogin(formData)
    }

    return (
        <main>
            <section className={`${style.sectionForm}`}>
                <div>
                    <img src={LogoKenzieHub} alt="Logo da Kenzie Hub" />
                </div>
                <form className={`${style.formContainer}`} onSubmit={handleSubmit(submit)}>
                    <h1 className="title1 white">Login</h1>
                    <Input
                        label="Email"
                        type="text"
                        placeholder="Digite seu email"
                        {...register("email")}
                        error={errors.email}
                        autoComplete="password"
                    />
                    <Input
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha"
                        {...register("password")}
                        error={errors.password}
                        autoComplete="password"
                    />
                    <button className="btn-primary paragraph white" type="submit">Entrar</button>
                    <Link className="headline white" to="/register">Ainda não possui uma conta</Link>
                    <Link className="btn-secondary paragraph white" to="/register">Cadastrar-se</Link>
                </form>
            </section>
        </main>
    )
}
