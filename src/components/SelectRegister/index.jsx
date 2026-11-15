import { forwardRef, useId } from "react"
import style from "../Input/style.module.scss"

export const SelectRegister = forwardRef(({ options, error, label, id, ...rest }, ref) => {
    const generatedId = useId()
    const selectId = id ?? generatedId
    const errorId = `${selectId}-error`

    return (
        <div className={style.field}>
            <label className={style.label} htmlFor={selectId}>{label}</label>
            <div className={`${style.control} ${error ? style.invalid : ""}`}>
                <select
                    id={selectId}
                    className={`${style.input} ${style.select}`}
                    ref={ref}
                    aria-invalid={error ? "true" : undefined}
                    aria-describedby={error ? errorId : undefined}
                    {...rest}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <svg className={style.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </div>
            {error ? <p id={errorId} className={style.error}>{error.message}</p> : null}
        </div>
    )
})

SelectRegister.displayName = "SelectRegister"
