import { Route, Routes } from "react-router-dom"
import { DashBoardPage } from "../pages/DashBoardPage"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"
import { ErrorPage } from "../pages/ErrorPage"
import { ProtectedRoutes } from "../ProtectedRoutes"

export const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<ProtectedRoutes />}>
                <Route index element={<DashBoardPage />} />
            </Route>
            <Route path="/*" element={<ErrorPage />} />
        </Routes>
    )
}