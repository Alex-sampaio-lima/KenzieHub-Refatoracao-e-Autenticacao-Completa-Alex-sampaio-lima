export const courseModules = [
    { value: "primeroModulo", label: "Primeiro módulo (Introdução ao Frontend)" },
    { value: "segundoModulo", label: "Segundo módulo (Frontend Avançado)" },
    { value: "terceiroModulo", label: "Terceiro módulo (Introdução ao Backend)" },
    { value: "quartoModulo", label: "Quarto módulo (Backend Avançado)" },
]

// contas criadas por outros apps guardam o texto do módulo direto, sem a chave
export const getModuleLabel = (value) =>
    courseModules.find((module) => module.value === value)?.label ?? value
