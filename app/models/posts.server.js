//Al agregarle el server.js le estamos diciendo a remix que este archivo solo debe ejecutarse en la parte de servidor de remix
export async function getPosts(){
    const respuesta = await fetch(`${process.env.API_URL}/posts?populate=imagen`)
    const resultado = await respuesta.json()
    return resultado
}


export async function getPost(url){
    const respuesta = await fetch(`${process.env.API_URL}/posts?filters[url]=${url}&populate=imagen`)
    return await respuesta.json()
}