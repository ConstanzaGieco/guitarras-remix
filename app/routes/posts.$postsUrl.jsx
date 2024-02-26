import { getPost } from "~/models/posts.server"
import {useLoaderData} from "@remix-run/react"
import { formatearFecha } from "~/utils/helpers"

//Segmentos dinámicos

export async function loader({params}){
  const { postsUrl } = params

  const post = await getPost(postsUrl)
  
  if(post.data.length === 0){
    throw new Response('', {
        status: 404,
        statusText: 'Post no encontrado',
    })
  }

  return post
}

//La funcion loader y meta están relacionadas, si hay una guitarra en loader va a estar disponible data en meta
export function meta({data}){
    if(!data){
        return (
            [
                {title: `GuitarLA - Blog no encontrado`},
                {description: `GuitarLA, venta de guitarras, blog no encontrado`}
            ]
        )
    }
    return (
        [
            {title: `GuitarLA - ${data.data[0].attributes.titulo}`},
            {description: `GuitarLA, venta de guitarras, blog ${data.data[0].attributes.titulo}`}
        ]
    )
}

const Post = () => {

    const post = useLoaderData()
    const {contenido, imagen, titulo, publishedAt} = post?.data[0]?.attributes

    return (
        <article className="post mt-3">
            <img src={imagen?.data?.attributes.url} alt={`imagen blog ${titulo}`} className="imagen"/>
            <div className="contenido">
                <h3>{titulo}</h3>
                <p className="fecha">{formatearFecha(publishedAt)}</p>
                <p className="texto">{contenido[0].children[0].text}</p>
            </div>
        </article>
    )
}

export default Post
