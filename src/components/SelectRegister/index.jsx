import { forwardRef } from "react"

export const SelectRegister = forwardRef(({ options, error, label, ...rest }, ref) => {
    return (
        <div>
            <label className="labelRegister headline white">{label}</label>
            <select ref={ref} {...rest} className="inputRegister headline grey">
                {options.map((option, index) => (
                    < option key={index} value={option.value} >
                        {option.label}
                    </option>
                ))}
            </select>
            {error ? <p className="headline white">{error.message}</p> : null}
        </div >
    )
})