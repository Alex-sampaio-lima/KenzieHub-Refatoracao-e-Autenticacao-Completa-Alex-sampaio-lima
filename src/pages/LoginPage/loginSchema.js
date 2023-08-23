import { z } from "zod"

export const loginShema = z.object({
    email: z
        .string()
        .nonempty("E-mail é obrigatório")
        .email("Forneça um e-mail válido"),
    password: z
        .string()
        .nonempty("Este campo é obrigatório")
})