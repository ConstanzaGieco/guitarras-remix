import ListadoPosts from "../components/listado-posts"
import { getPosts } from "~/models/posts.server"
import { useLoaderData } from "@remix-run/react"

export function meta(){
    return (
        [
            {title: 'GuitarLA - Nuestro Blog'},
            {description: 'GuitarLA, Blog de musica y venta de guitarras'}
        ]
    )
}

export async function loader(){
    const posts = await getPosts()
    return posts.data
}

const Blog = () => {
    const posts = useLoaderData()
    return (
        <ListadoPosts 
            posts={posts}
        />
    )
}

export default Blog