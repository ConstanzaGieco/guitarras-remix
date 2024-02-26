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

    return(
        <Document>
            <Outlet />
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