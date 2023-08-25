import LogoKenzieHub from "../../assets/LogoKenzieHub.svg"
import style from "./style.module.scss"
import { TodoContext } from "../../providers"
import { useContext } from "react"

export const DashBoardPage = () => {

    const { userLogout, user } = useContext(TodoContext)

    return (
        <main className={`${style.containerMain}`}>
            <div className={`${style.headerContainer}`}>
                <img src={LogoKenzieHub} alt="Logo da Kenze Hub" />
                <button className="btn-secondary back headlineBold white" onClick={() => userLogout()} type="button">Sair</button>
            </div>
            <hr className="" />
            <div className={`${style.messageContainer}`}>
                <h1 className="title1 white">Olá, {user?.name}</h1>
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