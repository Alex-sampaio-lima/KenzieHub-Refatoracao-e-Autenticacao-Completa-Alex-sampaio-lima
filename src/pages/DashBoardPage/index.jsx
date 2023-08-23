import { Link } from "react-router-dom"
import LogoKenzieHub from "../../assets/LogoKenzieHub.svg"
import style from "./style.module.scss"

export const DashBoardPage = () => {
    return (
        <main className={`${style.containerMain}`}>
            <div className={`${style.headerContainer}`}>
                <img src={LogoKenzieHub} alt="Logo da Kenze Hub" />
                <Link className="btn-secondary back headlineBold white" to="/register">
                    Sair
                </Link>
            </div>
            <hr className="" />
            <div className={`${style.messageContainer}`}>
                <h1 className="title1 white">Olá, Samuel Leão </h1>
                <p className="headline grey">Primeiro módulo  (Introdução ao Frontend)</p>
            </div>
            <hr />
            <div className={`${style.containerWarn}`}>
                <h1 className="title1 white">Que pena! Estamos em desenvolvimento :(</h1>
                <p className="paragraph white">Nossa aplicação está em desenvolvimento, em breve teremos novidades</p>
            </div>
        </main>
    )
}