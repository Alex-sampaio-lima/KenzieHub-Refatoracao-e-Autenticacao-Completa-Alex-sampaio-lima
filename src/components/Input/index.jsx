import { forwardRef } from "react"
import style from "./style.module.scss"

export const Input = forwardRef(({ label, error, ...rest }, ref) => {
    return (
        <div className={`${style.containerInput}`}>
            <label className="labelRegister headline white marginInputBottom">{label}</label>
            <input className={`${style.inputLogin} inputRegister headline white`} ref={ref} {...rest} />
            {error ? <p className="headline white">{error.message}</p> : null}
        </div>
    )
})