import React, { useEffect } from 'react'
import BudgetCard from '../components/BudgetCard'
import { useBudgets } from '../context/BudgetContext'

const BudgetPage = () => {

    const { budgets, getBudgets } = useBudgets()

    useEffect(() => {
        getBudgets()
    }, [])

    return (
        <div>
            <h1>Presupuestos</h1>
            <div className='_budgetContainer'>
                {   
                    budgets?.map(budget => 
                        <BudgetCard key={budget.id} budget={budget} />
                    )
                }
            </div>
        </div>
    )
}

export default BudgetPage