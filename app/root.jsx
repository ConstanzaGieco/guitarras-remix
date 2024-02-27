import { useState, useEffect } from 'react'
import {
    Meta,
    Links,
    Outlet,
    Scripts, //evitar el flash de los links
    LiveReload, //que recargue la página automaticamente
    useRouteError, //manejo de errores
    Link
} from '@remix-run/react'
import styles from '~/styles/index.css'
import Header from '~/components/header'
import Footer from '~/components/footer'

//META DE HTML
export function meta({error}){
    if(error?.status === 404){
        return(
            [
                {charset: 'utf-8'},
                {title: 'GuitarLA - Guitarra no encontrada'},
                {viewport: 'width=device-width,initial-scale=1'},
                {description: 'GuitarLA, venta de guitarras, guitarra no encontrada'}
            ]
        )
    }
    return(
        [
            {charset: 'utf-8'},
            {title: 'GuitarLA - Remix'},
            {viewport: 'width=device-width,initial-scale=1'}
        ]
    )
}

//CSS (externo google fonts y normalize + interno)
export function links(){
    return [
        {
            rel: 'stylesheet',
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        {
            rel: 'preconnect',
            href: "https://fonts.googleapis.com"
        },
        {
            rel: 'preconnect',
            href: "https://fonts.gstatic.com",
            crossOrigin: "true"
        },
        {
            rel: 'stylesheet',
            href:"https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
        },
        {
            rel: 'stylesheet',
            href: styles
        },
    ]
}

//APLICANDO META Y CSS
function Document({children}){
    return(
        <html lang="es">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Header />
                {children}
                <Footer />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}

//IMPACTANDO EN APP
export default function App(){

    //remix se ejecuta tanto en el cliente como en el servidor, la parte que se ejecuta en servidor no tiene el objeto de window. Entonces lo que estamos diciendo acá es si el codigo es del servidor que no haga nada null, pero si es del navegador que agregue el LS
    const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null
    const [carrito, setCarrito] = useState(carritoLS)

    //Con remix se recomienda que al llamar localstorage se utilice useEffect
    useEffect(()=>{
        localStorage.setItem('carrito', JSON.stringify(carrito))
    },[carrito])

    const agregarCarrito = guitarra => {
        if(carrito.some(guitarraState => guitarraState.id === guitarra.id)){
            //iterar sobre el arreglo, e identificar el elemento duplicado
            const carritoActualizado = carrito.map(guitarraState => {
                if(guitarraState.id === guitarra.id){
                    //reescribir la cantidad en funcion a la ultima seleccion de usuario (usar += si quiero que sea acumulativo)
                    guitarraState.cantidad = guitarra.cantidad
                }
                return guitarraState
            })
            //añadir al carrito
            setCarrito(carritoActualizado)
        } else{
            //registro nuevo, agregar al carrito
            setCarrito([...carrito, guitarra])
        }
    }

    const actualizarCantidad = guitarra => {
        const carritoActualizado = carrito.map(guitarraState => {
            if(guitarraState.id === guitarra.id){
                guitarraState.cantidad = guitarra.cantidad
            }
            return guitarraState
        })
        setCarrito(carritoActualizado)
    }

    const eliminarGuitarra = id => {
        const carritoActualizado = carrito.filter(guitarraState => guitarraState.id !== id)
        setCarrito(carritoActualizado)
    }

    return(
        <Document>
            <Outlet 
                context={{
                    agregarCarrito,
                    carrito,
                    actualizarCantidad,
                    eliminarGuitarra
                }}
            />
        </Document>
    )
}

//MANEJO DE ERRORES
export function ErrorBoundary(){
    const error = useRouteError()

    return (
        <Document>
            <p className='error'>{error.status} {error.statusText}</p>
            <Link className='error-enlace' to='/'>Tal vez quieras volver a la página principal</Link>
        </Document>
    )
}