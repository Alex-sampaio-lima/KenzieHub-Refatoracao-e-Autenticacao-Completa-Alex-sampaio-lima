import { Link } from "react-router-dom"
import style from "./style.module.scss"

export const ErrorPage = () => {
    return (
        <main className={style.page}>
            <p className={style.code}>404</p>
            <h1 className="title1">Página não encontrada</h1>
            <p className="paragraph grey">Não foi possível encontrar a página que você procura.</p>
            <Link className={`btn btn-primary ${style.back}`} to="/">Voltar para o início</Link>
        </main>
    )
}
