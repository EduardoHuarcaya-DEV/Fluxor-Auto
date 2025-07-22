import { Toaster } from "sonner"
import { RouterProvider } from "react-router-dom"
import router from "./routes/routes"

const App = () => {
  return (
    <div>
      <Toaster
        position="top-right"
        duration={5000}
        expand={true}
      />
      <RouterProvider router={router} />
    </div>
  )
}

export default App