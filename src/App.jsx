import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { RoutesMain } from "./routes"
import "./styles/index.scss"

function App() {

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <RoutesMain />
    </>
  )
}

export default App
