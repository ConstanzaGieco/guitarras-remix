import { getGuitarra } from "~/models/guitarras.server"
import {useLoaderData, useOutletContext } from "@remix-run/react"
import { useState } from "react"

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

  const {agregarCarrito} = useOutletContext()

  const [ cantidad, setCantidad ] = useState(0)
  const guitarra = useLoaderData()
  const {nombre, descripcion, imagen, precio} = guitarra.data[0].attributes

  function handleSubmit(e){
    e.preventDefault()
    if(cantidad < 1){
      alert('Debes seleccionar la cantidad')
      return
    }
    const guitarraSeleccionada = {
      id: guitarra.data[0].id,
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad
    }
    agregarCarrito(guitarraSeleccionada)
  }

  return (
    <div className="guitarra">
      <img src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`} className="imagen"/>
      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descripcion[0].children[0].text}</p>
        <p className="precio">${precio}</p>
        <form onSubmit={handleSubmit} className="formulario">
          <label htmlFor="cantidad">Cantidad</label>
          <select 
          onChange={e => setCantidad(+e.target.value)}
          id='cantidad'
          >
            <option value="0">-- Seleccione --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input type="submit" value='Añadir al carrito' />
        </form>
      </div>
    </div>
  )
}

export default Guitarra
