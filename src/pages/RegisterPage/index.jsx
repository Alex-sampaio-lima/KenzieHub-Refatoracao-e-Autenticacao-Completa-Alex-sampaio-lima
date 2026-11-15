import LogoKenzieHub from "../../assets/LogoKenzieHub.svg"
import style from "./style.module.scss"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { SelectRegister } from "../../components/SelectRegister"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema } from "./formSchema"
import { Input } from "../../components/Input"
import { AuthCard } from "../../components/AuthCard"
import { useContext } from "react"
import { userContext } from "../../providers"
import { courseModules } from "../../utils/courseModules"

const options = [{ value: "", label: "Selecione um módulo" }, ...courseModules]

export const RegisterPage = () => {

    const { userRegister } = useContext(userContext)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(formSchema)
    })

    const submit = async (formData) => {
        await userRegister(formData)
    }

    return (
        <div className={style.page}>
            <header className={style.topbar}>
                <img className={style.logo} src={LogoKenzieHub} alt="Kenzie Hub" />
                <Link className="btn btn-secondary btn-sm" to="/">Voltar</Link>
            </header>
            <main className={style.main}>
                <AuthCard title="Crie sua conta" subtitle="Rápido e grátis, vamos nessa">
                    <form className={style.form} onSubmit={handleSubmit(submit)} noValidate>
                        <Input
                            label="Nome"
                            type="text"
                            placeholder="Digite aqui seu nome"
                            {...register("name")}
                            error={errors.name}
                            autoComplete="name"
                        />
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Digite aqui seu email"
                            {...register("email")}
                            error={errors.email}
                            autoComplete="email"
                        />
                        <Input
                            label="Senha"
                            type="password"
                            placeholder="Digite aqui sua senha"
                            {...register("password")}
                            error={errors.password}
                            autoComplete="new-password"
                        />
                        <Input
                            label="Confirmar senha"
                            type="password"
                            placeholder="Digite novamente sua senha"
                            {...register("newPassword")}
                            error={errors.newPassword}
                            autoComplete="new-password"
                        />
                        <Input
                            label="Bio"
                            type="text"
                            placeholder="Fale sobre você"
                            {...register("bio")}
                            error={errors.bio}
                        />
                        <Input
                            label="Contato"
                            type="text"
                            placeholder="Opção de contato"
                            {...register("contact")}
                            error={errors.contact}
                        />
                        <SelectRegister
                            label="Selecionar módulo"
                            options={options}
                            {...register("course_module")}
                            error={errors.course_module}
                        />
                        <button className="btn btn-primary btn-block" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                        </button>
                    </form>
                    <p className={`headline grey ${style.footer}`}>
                        Já tem uma conta? <Link to="/">Entrar</Link>
                    </p>
                </AuthCard>
            </main>
        </div>
    )
}
