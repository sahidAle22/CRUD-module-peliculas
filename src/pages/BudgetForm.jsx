import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Formik} from 'formik'
import { createBudgetRequest, getActorsRequest, getDirectorRequest, getGendersRequest } from '../api/presupuesto.api'
import Alert from '../components/Alert'
import { useBudgets } from '../context/BudgetContext'

const BudgetForm = () => {

    const [presupuesto, setPresupuesto] = useState({
        name: "",
        clasificacion: "",
        puntuacion2: 0,
        link_trailer: "",
        vista_general: "",
        generos_ids: [],
        director_id: "",
        actor_ids: []
    })

    const clasificaciones = [
        {
            value: "G",
            label: "Publico general"
        },
        {
            value: "PG",
            label: "Se recomienda la compañia de un Adulto"
        },
        {
            value: "PG-13",
            label: "Mayores de 13 años"
        }, 
        {
            value: "R",
            label: "Obligatoria la compañia de un Adulto"
        },
        {
            value: "NC-17",
            label: "Mayores de 18"
        }
    ]

    const { getPresupuesto, updatePresupuesto } = useBudgets()
    const [error, setError] = useState({})
    const [showError, setShowError] = useState(false)
    
    // Estados para cargar información de los endpoints
    const [generos, setGeneros] = useState([])
    const [directors, setDirectors] = useState([])
    const [actors, setActors] = useState([])

    const [selectedGenres, setSelectedGenres] = useState([])
    const [selectedActors, setSelectedActors] = useState([])

    const params = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        const loadPresupuesto = async () => {
            if(params.id){
                const presupuesto = await getPresupuesto(params.id)
                console.log(presupuesto)
                setPresupuesto({
                    name: presupuesto.name,
                    link_trailer: presupuesto.link_trailer,
                    clasificacion: presupuesto.clasificacion,
                    puntuacion2: presupuesto.puntuacion,
                    vista_general: presupuesto.vista_general,
                    director_id: presupuesto.director_id[0],
                })

                setSelectedGenres(presupuesto.generos_ids.map(genero => genero.id));
                setSelectedActors(presupuesto.actor_ids.map(actor => actor.id));
            }
        }

        async function loadDirectors (){
            const response = await getDirectorRequest()
            setDirectors(response.data)
        }

        async function loadActors (){
            const response = await getActorsRequest()
            setActors(response.data)
        }

        async function loadGenders (){
            const response = await getGendersRequest()
            setGeneros(response.data)
        }
        
        loadPresupuesto();
        loadDirectors()
        loadActors()
        loadGenders()
    },[])
    
    console.log(actors)
    console.log(generos)

    return (
        
        <div>
            <h1>
                { params.id ? "Editar Presupuesto" : "Crear Presupuesto"}
            </h1>    
            <Formik
                initialValues={ presupuesto }
                enableReinitialize={true}
                onSubmit={async (values, actions) => {
                    try {
                        
                        values.generos_ids = selectedGenres;
                        values.actor_ids = selectedActors
                        console.log(values)
                        
                        if(params.id){
                            updatePresupuesto(params.id,values)
                            navigate("/")
                        } else {
                            values.director_id = Number(values.director_id)
                            const response = await createBudgetRequest(values)
                            console.log(response)
                        }

                        setSelectedGenres([])
                        actions.resetForm()
                    } catch(error){
                        setError(error)
                        setShowError(true)
                        console.log(error)
                    }
                }}
            >
                { ({handleChange, handleSubmit, values}) => (
                    <Form onSubmit={handleSubmit}>
                        <div className='_formContainer'>
                            { showError && <Alert message={error.message} type={'error'}/> }

                            <div className='_inputContainer'>
                                <label>Nombre: </label>
                                <input 
                                    type='text'
                                    name='name'
                                    placeholder='Introducen el nombre' 
                                    onChange={handleChange}
                                    value={values.name}
                                />
                            </div>

                            <div className='_inputContainer'>
                                <label>Clasificacion: </label>
                                <select 
                                    className='_select' 
                                    id="clasificacionSelect" 
                                    name="clasificacion" 
                                    value={values.clasificacion}
                                    onChange={handleChange} 
                                >
                                    <option value="">-- Elija una clasificación --</option>
                                    { clasificaciones.map(clas => <option key={clas.value} value={clas.value}>{clas.label}</option>) }
                                </select>
                            </div>                               

                            <div className='_inputContainer'>
                                <label>Generos: </label>
                                { generos.map(genero => (
                                    <div key={genero.id}>
                                        <input
                                            type="checkbox"
                                            id={`gen-${genero.id}`}
                                            value={genero.id}
                                            checked={selectedGenres.includes(genero.id)}
                                            onChange={(event) => {
                                                const isChecked = event.target.checked;
                                                if (isChecked) {
                                                    setSelectedGenres([...selectedGenres, genero.id]);
                                                } else {
                                                    setSelectedGenres(selectedGenres.filter((id) => id !== genero.id));
                                                }
                                            }}
                                        />
                                        <label htmlFor={`gen-${genero.id}`}>{genero.name}</label>
                                    </div>
                                ))} 
                            </div>

                            <div className='_inputContainer'>
                                <label>Puntuación</label>
                                <input 
                                    type='number'
                                    min={0}
                                    max={100}
                                    name='puntuacion2'
                                    placeholder='Introduce la clasificacion'
                                    onChange={handleChange}
                                    value={values.puntuacion2}
                                />
                            </div>

                            <div className='_inputContainer'>
                                <label>Vista General: </label>
                                <input 
                                    type='text'
                                    name='vista_general'
                                    placeholder='Introduce la la vista general'
                                    onChange={handleChange}
                                    value={values.vista_general}
                                />
                            </div>

                            <div className='_inputContainer'>
                                <label>Trailer</label>
                                <input 
                                    type='text'
                                    name='link_trailer'
                                    placeholder='Introduce el link de la pelicula'
                                    onChange={handleChange}
                                    value={values.link_trailer}
                                />
                            </div>

                            <div className='_inputContainer'>
                                <label>Director: </label>
                                <select 
                                    className='_select' 
                                    id="directorSelect" 
                                    name="director_id" 
                                    value={values.director_id}
                                    onChange={handleChange} 
                                >
                                    <option value="">-- Elija un Director --</option>
                                    {
                                        directors?.map(director => (
                                            <option key={director.id} value={director.id}>{director.name}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className='_inputContainer'>
                                <label>Actores: </label>
                                { actors.map(actor => (
                                    <div key={actor.id}>
                                        <input
                                            type="checkbox"
                                            id={`act-${actor.id}`}
                                            value={actor.id}
                                            checked={selectedActors.includes(actor.id)}
                                            onChange={(event) => {
                                                const isChecked = event.target.checked;
                                                if (isChecked) {
                                                    setSelectedActors([...selectedActors, actor.id]);
                                                } else {
                                                    setSelectedActors(selectedActors.filter((id) => id !== actor.id));
                                                }
                                            }}
                                        />
                                        <label htmlFor={`gen-${actor.id}`}>{actor.name}</label>
                                    </div>
                                ))} 
                            </div>

                            <button type='submit' className='_btnSubmit'>{params.id ? "Editar" : "Crear"}</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default BudgetForm