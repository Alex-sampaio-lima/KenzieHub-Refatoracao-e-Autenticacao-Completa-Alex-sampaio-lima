import { z } from "zod";

export const formSchema = z.object({
    name: z.string().nonempty("Nome é obrigatório"),
    email: z
        .string()
        .nonempty("E-mail é obrigatório")
        .email("Forneça um e-mail válido"),
    password: z
        .string()
        .nonempty("Este campo é obrigatório")
        .min(8, "É necessário pelo menos 8 caracteres")
        .regex(/(?=.*?[A-Z])/, "É necessário pelo menos uma letra maiúscula")
        .regex(/(?=.*?[a-z])/, "É necessário pelo menos um letra minúscula")
        .regex(/(?=.*?[#?!@$%^&*-])/, "A senha deve conter caracteres especiais ")
        .regex(/(?=.*?[0-9])/, "É necessário pelo menos uma número"),
    newPassword: z.string().nonempty("Este campo é obrigatório"),
    bio: z.string()
        .nonempty("Este campo é obrigatório"),
    course_module: z
        .string()
        .nonempty("Este campo é obrigatório"),
    contact: z.string().nonempty("Este campo é obrigatório"),
}).refine(({ password, newPassword }) => password === newPassword, {
    message: "As senhas não correspondem.",
    path: ["newPassword"],
});


