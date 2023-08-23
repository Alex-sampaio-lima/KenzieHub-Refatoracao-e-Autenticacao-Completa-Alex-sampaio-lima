import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { RoutesMain } from "./routes"
import "./styles/index.scss"

function App() {

  return (
    <>
      <ToastContainer />
      <RoutesMain />
    </>
  )
}

export default App
