import LogoKenzieHub from "../../assets/LogoKenzieHub.svg"
import style from "./style.module.scss"
import { userContext } from "../../providers"
import { useContext } from "react"
import { getModuleLabel } from "../../utils/courseModules"

const getInitials = (name = "") => {
    const words = name.trim().split(/\s+/).filter(Boolean)
    const first = words[0]?.[0] ?? ""
    const last = words.length > 1 ? words[words.length - 1][0] : ""
    return (first + last).toUpperCase()
}

export const DashBoardPage = () => {

    const { userLogout, user } = useContext(userContext)

    const moduleLabel = getModuleLabel(user?.course_module)

    return (
        <>
            <header className={style.header}>
                <div className={`container ${style.headerInner}`}>
                    <img className={style.logo} src={LogoKenzieHub} alt="Kenzie Hub" />
                    <button className="btn btn-secondary btn-sm" onClick={() => userLogout()} type="button">Sair</button>
                </div>
            </header>
            <main className={`container ${style.main}`}>
                <section className={`card ${style.profile}`}>
                    <span className={style.avatar} aria-hidden="true">{getInitials(user?.name)}</span>
                    <h1 className={`title1 ${style.greeting}`}>Olá, {user?.name}</h1>
                    {moduleLabel ? <p className={style.module}>{moduleLabel}</p> : null}
                </section>
                <section className={style.warn}>
                    <span className={style.warnIcon} aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />
                        </svg>
                    </span>
                    <h2 className="title2">Que pena! Estamos em desenvolvimento :(</h2>
                    <p className="paragraph grey">Nossa aplicação está em desenvolvimento, em breve teremos novidades</p>
                </section>
            </main>
        </>
    )
}
