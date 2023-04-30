import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useBudgets } from '../context/BudgetContext'
import img from '../img/f.jpg'

const BudgetCard = ({ budget }) => {

    const { id, name, puntuacion } = budget
    const { deleteBudget } = useBudgets()
    const navigate = useNavigate()

    const setVoteClass = (puntuacion) => {
        if (puntuacion >= 80) {
            return "_tagGreen"
        } else if (puntuacion >= 60) {
            return "_tagOrange"
        } else {
            return "_tagRed"
        }
    }

    return (
        <div className='_budget'>
            <img src={img} />
            <div className='_budgetInfo'>
                <h3>{name}</h3>
                <span className={`_tag ${setVoteClass(puntuacion)}`}>{puntuacion}</span>
            </div>

            <div className='_btnsContainer'>
                <button onClick={() => navigate(`/info/${id}`)} className='_btn'>Complete</button>
                <button onClick={() => navigate(`/edit/${id}`)} className='_btn _edit'>Edit</button>
                <button onClick={() => deleteBudget(id)} className='_btn _delete'>Delete</button>
            </div>

        </div>


    )
}

export default BudgetCard