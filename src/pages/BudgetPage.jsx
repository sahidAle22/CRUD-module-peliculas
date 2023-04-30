import React, { useEffect } from 'react'
import BudgetCard from '../components/BudgetCard'
import { useBudgets } from '../context/BudgetContext'

const BudgetPage = () => {
 
    const { presupuestos, loadPresupuestos } = useBudgets()

    useEffect(() => {
        loadPresupuestos()
    },[])

    console.log(presupuestos)

    return (
        <div>
            <h1>Presupuestos</h1>
            <div className='budget-container'>
                { presupuestos?.map(presupuesto => <BudgetCard key={presupuesto.id} presupuesto={presupuesto}/>)}
            </div>
        </div>
    )
}

export default BudgetPage