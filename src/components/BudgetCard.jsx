import React from 'react'
import img from '../img/f.jpg'
import { useNavigate } from 'react-router-dom'
import { useBudgets } from '../context/BudgetContext'

const BudgetCard = ({ presupuesto }) => {

    const { id, name, puntuacion } = presupuesto
    const { deletePresupuesto } = useBudgets()
    const navigate = useNavigate()

    const setVoteClass = (puntuacion) => {
        if(puntuacion >= 80){
            return "tagGreen"
        } else if(puntuacion >= 60){
            return "tagOrange"
        } else {
            return "tagRed"
        }
    }

    return (
        <div className='budget'>
            <img src={img}/>
            <div className='budget-info'>
                <h3>{name}</h3>
                <span className={`tag ${setVoteClass(puntuacion)}`}>{puntuacion}</span>
            </div>

            <div className='btns-container'>
                <button onClick={() => navigate(`/info/${id}`)} className='btn'>Complete</button>
                <button onClick={() => navigate(`/edit/${id}`)} className='btn edit'>Edit</button>
                <button onClick={() => deletePresupuesto(id)} className='btn delite'>Delete</button>
            </div>  
      
        </div>

        
    )
}

export default BudgetCard