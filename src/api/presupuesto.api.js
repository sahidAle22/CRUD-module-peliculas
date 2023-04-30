import axios from "axios"

export const getBudgetsRequest = async () =>
    await axios.get("http://localhost:8071/api/presupuesto")

export const getBudgetRequest = async id =>
    await axios.get(`http://localhost:8071/api/presupuesto/${id}`)

export const updateBudgetRequest = async (id,newFields) => {
    const data = {
        jsonrpc: '2.0',
        method: 'call',
        id: new Date().getTime(),
        params: {idPresupuesto: Number(id), ...newFields}
    }

    return await axios.post(`http://localhost:8071/api/presupuesto/actualizar`, data)
}

export const createBudgetRequest = async (budget) => {
    const data = {
        jsonrpc: '2.0',
        method: 'call',
        id: new Date().getTime(),
        params: budget
    }
    return await axios.post("http://localhost:8071/api/presupuesto/crear", data)

}

export const deleteBugetRequest = async id => {
    const data = {
        jsonrpc: '2.0',
        method: 'call',
        id: new Date().getTime(),
        params: {
            idPresupuesto: id
        },
    }

    const headers = {
        'Content-Type': 'application/json',
    }

    return (await axios.post('http://localhost:8071/api/presupuesto/eliminar', data, { headers })).data
}

export const getDirectorRequest = async () =>
    await axios.get("http://localhost:8071/api/directores")

export const getActorsRequest = async () =>
    await axios.get("http://localhost:8071/api/actores")

export const getGendersRequest = async () =>
    await axios.get("http://localhost:8071/api/generos")
