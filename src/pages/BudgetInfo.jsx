import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { formatearFecha } from '../helpers'
import Genre from '../components/Genre'
import Actor from '../components/Actor'
import img from '../img/f.jpg'
import { useBudgets } from '../context/BudgetContext'

const BudgetInfo = () => {

    const params = useParams()
    const [budget, setBudget] = useState({})
    const { getBudget } = useBudgets()

    useEffect(() => {
        async function loadBudget() {
            const response = await getBudget(params.id)
            setBudget(response)
        }

        loadBudget()
    }, [])

    return (
        <div className='_budgetInfoContainer'>
            <div className='_header'>
                <img src={img} />
                <div className='_infoText'>
                    <h1 className='_budgetTitle'>{budget?.name}</h1>
                    <p className='_budgetClasification'>{budget?.clasificacion && `Clasificación: ${budget.clasificacion}`}</p>
                    <p className='_vista_general'>{budget?.vista_general}</p>

                    {
                        budget.generos_ids?.length > 0
                            ?
                            <div className='_genderContainer'>
                                {
                                    budget.generos_ids?.map(genero => <Genre key={genero.id} name={genero.name} />)
                                }
                            </div>
                            : ""
                    }

                    {
                        budget?.director_id
                            ? <p>Director <i className="fa-solid fa-film"></i> - {budget.director_id[1]} </p>
                            : ""
                    }

                    {
                        budget.actor_ids?.length > 0
                            ?
                            <div className='_actorsContainer'>
                                <p className='_acrtorTitle'>Actores <i className="fa-solid fa-people-line"></i></p>
                                <div className='_actorsList'>
                                    {budget.actor_ids?.map(actor => <Actor className='_actor' key={actor.id} name={actor.name} />)}
                                </div>
                            </div>
                            : ""
                    }

                    {
                        budget?.fch_creacion
                            ? <p>Fecha de creación {formatearFecha(budget?.fch_creacion)}</p>
                            : ""
                    }

                    {
                        budget?.link_trailer
                            ?
                            <>
                                Trailer:
                                <a href={budget.link_trailer} target="_blank"> Ir <i className="fa-solid fa-link"></i></a>
                            </>
                            : ''
                    }
                </div>
            </div>
        </div>
    )
}

export default BudgetInfo