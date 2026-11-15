import { forwardRef, useId, useState } from "react"
import style from "./style.module.scss"

const EyeIcon = ({ crossed }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {crossed ? (
            <>
                <path d="M9.9 5.2A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-2.9 3.9M6.6 6.6C3.6 8.5 2 12 2 12s3.5 7 10 7c1.9 0 3.5-.5 4.9-1.3M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                <path d="m3 3 18 18" />
            </>
        ) : (
            <>
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
            </>
        )}
    </svg>
)

export const Input = forwardRef(({ label, error, type = "text", id, ...rest }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const errorId = `${inputId}-error`

    const isPassword = type === "password"
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div className={style.field}>
            <label className={style.label} htmlFor={inputId}>{label}</label>
            <div className={`${style.control} ${error ? style.invalid : ""}`}>
                <input
                    id={inputId}
                    className={style.input}
                    type={isPassword && isVisible ? "text" : type}
                    ref={ref}
                    aria-invalid={error ? "true" : undefined}
                    aria-describedby={error ? errorId : undefined}
                    {...rest}
                />
                {isPassword ? (
                    <button
                        className={style.toggle}
                        type="button"
                        onClick={() => setIsVisible(!isVisible)}
                        aria-label={isVisible ? "Ocultar senha" : "Mostrar senha"}
                        aria-pressed={isVisible}
                    >
                        <EyeIcon crossed={isVisible} />
                    </button>
                ) : null}
            </div>
            {error ? <p id={errorId} className={style.error}>{error.message}</p> : null}
        </div>
    )
})

Input.displayName = "Input"
