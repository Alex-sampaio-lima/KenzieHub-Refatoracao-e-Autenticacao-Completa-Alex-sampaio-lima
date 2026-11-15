import style from "./style.module.scss"

export const AuthCard = ({ title, subtitle, children }) => {
    return (
        <section className={`card ${style.card}`}>
            <header className={style.header}>
                <h1 className="title1">{title}</h1>
                {subtitle ? <p className="paragraph grey">{subtitle}</p> : null}
            </header>
            {children}
        </section>
    )
}
