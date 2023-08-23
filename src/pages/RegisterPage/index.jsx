import LogoKenzieHub from "../../assets/LogoKenzieHub.svg"
import style from "../RegisterPage/style.module.scss"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { SelectRegister } from "../../components/SelectRegister"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema } from "./formSchema"
import { api } from "../../services/api"
import { Input } from "../../components/Input"
import { toast } from "react-toastify"

export const RegisterPage = () => {
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

    const { register, handleSubmit, error, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema)
    })

    const submit = (formData) => {
        userRegister(formData)
    }

    const options = [
        { value: "", label: "-- Selecione um Módulo --" },
        { value: "primeroModulo", label: "Primeiro módulo (Introdução ao Frontend)" },
        { value: "segundoModulo", label: "Segundo módulo (Frontend Avançado)" },
        { value: "terceiroModulo", label: "Terceiro módulo (Introdução ao Backend)" },
        { value: "quartoModulo", label: "Quarto módulo (Backend Avançado)" }
    ]

    return (
        <>
            <header className={`${style.headerContainer}`}>
                <div className={`${style.containerTitle}`}>
                    <img src={LogoKenzieHub} alt="Logo do Kenzie Hub" />
                    <Link to="/">
                        <button className="btn-secondary back headline secondary" type="button">Voltar</button>
                    </Link>
                </div>
            </header>
            <main>
                <section className={`${style.sectionContainer}`}>
                    <form
                        className={`${style.formContainer}`}
                        onSubmit={handleSubmit(submit)}
                    >
                        <h1 className="title1 white">Crie sua conta</h1>
                        <p className="headline grey">Rápido e grátis, vamos nessa</p>
                        <Input
                            label="Seu nome"
                            type="text"
                            placeholder="Digite seu nome"
                            {...register("name")}
                            error={errors.name}
                        />
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Digite aqui seu email"
                            {...register("email")}
                            error={errors.email}
                        />
                        <Input
                            label="Senha"
                            type="password"
                            placeholder="Digite aqui sua senha"
                            {...register("password")}
                            error={errors.password}
                        />
                        <Input
                            label="Confirme sua senha"
                            type="newPassword"
                            placeholder="Confirme sua senha"
                            {...register("newPassword")}
                            error={errors.newPassword}
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
                            options={options}
                            name="option"
                            {...register("course_module")}
                            error={errors.course_module}
                        />
                        <Link className="title2 white" to="/">
                            Já tenho uma conta
                        </Link>
                        <button className="paragraph white btn-negative" type="submit">
                            Cadastrar
                        </button>
                    </form>
                </section>
            </main>
        </>
    )
}
