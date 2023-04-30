import { createContext, useContext, useState  } from 'react'
import { 
    getBudgetsRequest, 
    getBudgetRequest,
    deleteBugetRequest,
    updateBudgetRequest
} from '../api/presupuesto.api'

export const BudgetContext = createContext()

export const useBudgets = () => {
    const context = useContext(BudgetContext)
    if(!context){

    }

    return context
}

export const BudgetContextProvider = ({ children }) => {

    const [presupuestos, setPresupuestos] = useState([])

    async function loadPresupuestos (){
        const response = await getBudgetsRequest()
        setPresupuestos(response.data)
    }

    const getPresupuesto = async id => {
        try {
            const response = await getBudgetRequest(id)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const deletePresupuesto = async (id) => {
        try {
            const response = await deleteBugetRequest(id)
            console.log(response)
            setPresupuestos(presupuestos.filter(presupuesto => presupuesto.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    const updatePresupuesto = async (id, newFields) => {
        try {
            const response = await updateBudgetRequest(id,newFields)
            console.log(response)
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <BudgetContext.Provider 
            value={{ presupuestos, loadPresupuestos, deletePresupuesto, getPresupuesto, updatePresupuesto }}
        > 
            { children } 
        </BudgetContext.Provider>
    ) 
}