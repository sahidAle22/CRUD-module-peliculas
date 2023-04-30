import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBudgetRequest } from '../api/presupuesto.api'
import img from '../img/f.jpg'
import { formatearFecha } from '../helpers'
import Genre from '../components/Genre'
import Actor from '../components/Actor'

const BudgetInfo = () => {

    const params = useParams()
    const [presupuesto, setPresupuesto] = useState({})
    
    useEffect(() => {
        async function loadPresupuesto (){
            const response = await getBudgetRequest(params.id)
            setPresupuesto(response.data)
            console.log(response.data)
        }
        loadPresupuesto()
    },[])
    
    return (
        <div className='_budgetInfoContainer'>

            <div className='_header'>
                <img src={img}/>
                <div className='_infoText'>
                    <h1 className='_budgetTitle'>{presupuesto?.name}</h1>
                    <p className='_budgetClasif'>{presupuesto?.clasificacion && `Clasificación: ${presupuesto.clasificacion}`}</p>
                    <p className='_vista_general'>{presupuesto?.vista_general}</p>

                    {
                        presupuesto.generos_ids?.length > 0
                        ? 
                            <div className='_genderContainer'>
                                { presupuesto.generos_ids?.map(genero =>  <Genre key={genero.id} name={genero.name}/> )}
                            </div>
                        :   ""
                    } 
                    
                    { 
                        presupuesto?.director_id
                        ?   <p>Director <i className="fa-solid fa-film"></i> - {presupuesto.director_id[1]} </p>
                        :   ""
                    } 

                    {
                        presupuesto.actor_ids?.length > 0
                        ?   
                            <div className='_actorsContainer'>
                                <p className='_acrtorTitle'>Actores <i className="fa-solid fa-people-line"></i></p>
                                <div className='_actorsList'>
                                    { presupuesto.actor_ids?.map(actor =>  <Actor className='_actor' key={actor.id} name={actor.name}/> )}
                                </div>
                            </div>
                        :   ""
                    }

                    {
                        presupuesto?.fch_creacion
                        ?   <p>Fecha de creación {formatearFecha(presupuesto?.fch_creacion)}</p>
                        :   ""
                    }


                    {
                        presupuesto?.link_trailer 
                        ? 
                            <>
                                Trailer:
                                <a href={presupuesto.link_trailer} target="_blank"> Ir <i className="fa-solid fa-link"></i></a>
                            </>
                        :   '' 
                    }
                </div>
            </div>
        </div>
    )
}

export default BudgetInfo