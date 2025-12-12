import Home from "./pages/Home"
import { ExpenseProvider } from "./contexts/ExpenseContext"

function App() {
  return (
    <>
      <ExpenseProvider>
        <Home/>
      </ExpenseProvider>
    </>
  )
}

export default App
