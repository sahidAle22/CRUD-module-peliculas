import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import BudgetPage from './pages/budgetPage'
import BudgetForm from './pages/BudgetForm'
import BudgetInfo from './pages/BudgetInfo'
import { BudgetContextProvider } from './context/BudgetContext'

const App = () => {
    return (
        <BudgetContextProvider>
            <Navbar/>
            <Routes>
                <Route path='/' element={<BudgetPage/>}/>
                <Route path='/new' element={<BudgetForm/>}/>
                <Route path='/edit/:id' element={<BudgetForm/>}/>
                <Route path='/info/:id' element={<BudgetInfo/>}/>
            </Routes>
        </BudgetContextProvider>
    )
}

export default App