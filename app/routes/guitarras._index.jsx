import { getGuitarras } from "~/models/guitarras.server" //de esta forma la parte del servidor de remix se va a encargar de hacer la consulta en la parte del servidor y no en la del cliente
import { useLoaderData } from "@remix-run/react"
import ListadoGuitarras from "../components/listado-guitarras"

export function meta(){
    return (
        [
            {title: 'GuitarLA - Tienda de Guitarras'},
            {description: 'GuitarLA - Nuestra coleccion de guitarras'}
        ]
    )
}

export async function loader(){
    const guitarras = await getGuitarras()
    return guitarras.data
}

const Tienda = () => {

    const guitarras = useLoaderData()

    return (
        <ListadoGuitarras 
            guitarras={guitarras}
        />
    )
}

export default Tienda