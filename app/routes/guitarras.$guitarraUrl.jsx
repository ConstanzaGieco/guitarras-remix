import { getGuitarra } from "~/models/guitarras.server"
import {useLoaderData} from "@remix-run/react"

//Segmentos dinámicos

export async function loader({params}){
  const { guitarraUrl } = params

  const guitarra = await getGuitarra(guitarraUrl)
  
  if(guitarra.data.length === 0){
    throw new Response('', {
        status: 404,
        statusText: 'Guitarra no encontrada',
    })
  }

  return guitarra
}

//La funcion loader y meta están relacionadas, si hay una guitarra en loader va a estar disponible data en meta
export function meta({data}){
  return (
    [
        {title: `GuitarLA - ${data.data[0].attributes.nombre}`},
        {description: `GuitarLA, venta de guitarras, guitarra ${data.data[0].attributes.nombre}`}
    ]
  )
}

const Guitarra = () => {

  const guitarra = useLoaderData()
  const {nombre, descripcion, imagen, precio} = guitarra.data[0].attributes

  return (
    <div className="guitarra">
      <img src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`} className="imagen"/>
      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descripcion[0].children[0].text}</p>
        <p className="precio">${precio}</p>
      </div>
    </div>
  )
}

export default Guitarra
