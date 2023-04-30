import { createContext, useContext, useState  } from 'react'
import { 
    getBudgetsRequest, 
    getBudgetRequest,
    createBudgetRequest,
    updateBudgetRequest,
    deleteBugetRequest,
} from '../api/presupuesto.api'

export const BudgetContext = createContext()

export const useBudgets = () => {
    const context = useContext(BudgetContext)
    if(!context){

    }

    return context
}

export const BudgetContextProvider = ({ children }) => {

    const [budgets, setBudgets] = useState([])

    const getBudgets = async () => {
        try {
            const response = await getBudgetsRequest()
            setBudgets(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getBudget = async id => {
        try {
            const response = await getBudgetRequest(id)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const createBudget = async (values) => {
        try {
            const response = await createBudgetRequest(values);
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const updateBudget = async (id, newFields) => {
        try {
            const response = await updateBudgetRequest(id,newFields)
            console.log(response)
        } catch(error) {
            console.log(error)
        }
    }
    
    const deleteBudget = async (id) => {
        try {
            const response = await deleteBugetRequest(id)
            console.log(response)
            setBudgets(budgets.filter(budget => budget.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <BudgetContext.Provider 
            value={{ 
                budgets, 
                getBudgets,
                getBudget, 
                updateBudget,
                createBudget, 
                deleteBudget, 
            }}
        > 
            { children } 
        </BudgetContext.Provider>
    ) 
}