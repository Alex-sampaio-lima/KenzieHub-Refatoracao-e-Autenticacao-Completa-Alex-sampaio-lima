// A API original (kenziehub.herokuapp.com) saiu do ar. Este adapter do axios responde
// às mesmas rotas (/users, /sessions, /profile) guardando os dados no localStorage,
// então as contas existem só neste navegador. É uma simulação, não segurança de verdade.
import { AxiosError } from "axios"

const DB_KEY = "@KENZIEHUB:FAKE_API"
const LATENCY_MS = 400

const readDb = () => {
    try {
        return JSON.parse(localStorage.getItem(DB_KEY)) ?? { users: [], sessions: {} }
    } catch {
        return { users: [], sessions: {} }
    }
}

const writeDb = (db) => localStorage.setItem(DB_KEY, JSON.stringify(db))

const hashPassword = async (email, password) => {
    const bytes = new TextEncoder().encode(`${email}:${password}`)
    const digest = await crypto.subtle.digest("SHA-256", bytes)
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")
}

const publicUser = (user) =>
    Object.fromEntries(Object.entries(user).filter(([key]) => key !== "passwordHash"))

const routes = {
    "POST /users": async ({ body }) => {
        const db = readDb()
        const email = body.email.trim().toLowerCase()

        if (db.users.some((user) => user.email === email)) {
            return [401, { status: "error", message: "Email already exists" }]
        }

        const now = new Date().toISOString()
        const user = {
            id: crypto.randomUUID(),
            name: body.name,
            email,
            course_module: body.course_module,
            bio: body.bio,
            contact: body.contact,
            techs: [],
            works: [],
            created_at: now,
            updated_at: now,
            avatar_url: null,
            passwordHash: await hashPassword(email, body.password),
        }
        writeDb({ ...db, users: [...db.users, user] })

        return [201, publicUser(user)]
    },

    "POST /sessions": async ({ body }) => {
        const db = readDb()
        const email = body.email.trim().toLowerCase()
        const user = db.users.find((user) => user.email === email)

        if (!user || user.passwordHash !== (await hashPassword(email, body.password))) {
            return [401, { status: "error", message: "Incorrect email / password combination" }]
        }

        const token = crypto.randomUUID()
        writeDb({ ...db, sessions: { ...db.sessions, [token]: user.id } })

        return [200, { user: publicUser(user), token }]
    },

    "GET /profile": async ({ token }) => {
        const db = readDb()
        const user = db.users.find((user) => user.id === db.sessions[token])

        if (!user) {
            return [401, { status: "error", message: "Invalid JWT token" }]
        }

        return [200, publicUser(user)]
    },
}

export const fakeApiAdapter = async (config) => {
    await new Promise((resolve) => setTimeout(resolve, LATENCY_MS))

    const route = routes[`${config.method.toUpperCase()} ${config.url}`]
    const authorization = config.headers.get("Authorization") ?? ""
    const [status, data] = route
        ? await route({
            body: config.data ? JSON.parse(config.data) : {},
            token: authorization.replace("Bearer ", ""),
        })
        : [404, { status: "error", message: "Not found" }]

    const response = { data, status, statusText: "", headers: {}, config, request: null }

    if (status >= 400) {
        throw new AxiosError(
            `Request failed with status code ${status}`,
            AxiosError.ERR_BAD_REQUEST,
            config,
            null,
            response
        )
    }

    return response
}
