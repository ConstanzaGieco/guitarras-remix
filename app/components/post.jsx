import { Link } from "@remix-run/react"
import { formatearFecha } from "../utils/helpers"

const Post = ({post}) => {

    const {contenido, imagen, titulo, url, publishedAt} = post
    console.log(post)

    return (
        <article className="post">
            <img src={imagen.data.attributes.formats.small.url} alt={`imagen blog ${titulo}`} className="imagen"/>
            <div className="contenido">
                <h3>{titulo}</h3>
                <p className="fecha">{formatearFecha(publishedAt)}</p>
                <p className="resumen">{contenido[0].children[0].text}</p>
                <Link className="enlace" to={`/posts/${url}`}>Leer Post</Link>
            </div>
        </article>
    )
}

export default Post
