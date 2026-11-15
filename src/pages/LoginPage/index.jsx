import { Link } from "react-router-dom"
import { Input } from "../../components/Input"
import { AuthCard } from "../../components/AuthCard"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginShema } from "./loginSchema"
import LogoKenzieHub from "../../assets/LogoKenzieHub.svg"
import style from "./style.module.scss"
import { useContext } from "react"
import { userContext } from "../../providers"

export const LoginPage = () => {

    const { userLogin } = useContext(userContext)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginShema)
    })

    const submit = async (formData) => {
        await userLogin(formData)
    }

    return (
        <main className={style.page}>
            <img className={style.logo} src={LogoKenzieHub} alt="Kenzie Hub" />
            <AuthCard title="Login" subtitle="Acesse sua conta para continuar">
                <form className={style.form} onSubmit={handleSubmit(submit)} noValidate>
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Digite seu email"
                        {...register("email")}
                        error={errors.email}
                        autoComplete="email"
                    />
                    <Input
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha"
                        {...register("password")}
                        error={errors.password}
                        autoComplete="current-password"
                    />
                    <button className="btn btn-primary btn-block" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Entrando..." : "Entrar"}
                    </button>
                </form>
                <div className={style.footer}>
                    <p className="headline grey">Ainda não possui uma conta?</p>
                    <Link className="btn btn-secondary btn-block" to="/register">Cadastre-se</Link>
                </div>
            </AuthCard>
        </main>
    )
}
