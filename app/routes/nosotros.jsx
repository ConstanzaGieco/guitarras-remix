import imagen from '../../public/img/nosotros.jpg'
import styles from '~/styles/nosotros.css'

export function meta(){
    return (
        [
            {title: 'GuitarLA - Sobre Nosotros'},
            {description: 'Venta de guitarras, blog de música'}
        ]
    )
}

export function links(){
    return [
        {
            rel: 'stylesheet',
            href: styles
        },
        { //cargar elementos antes de que el navegador comience a renderizar la página
            rel: 'preload',
            href: imagen,
            as: 'image'
        }
    ]
}

const Nosotros = () => {
    return (
        <main className="contenedor nosotros">
            <h2 className="heading">Nosotros</h2>
            <div className="contenido">
                <img src={imagen} alt="imagen sobre nosotros" />
                <div>
                    <p>Quisque efficitur, nulla sed semper pretium, dolor elit consequat augue, ac lacinia odio purus eu nibh. Suspendisse ullamcorper tempus est. Phasellus in mattis enim. In vulputate mollis nisi. Aliquam in tincidunt tellus. Pellentesque ac magna quis metus faucibus luctus ut id diam. Nunc viverra, purus eget suscipit bibendum, diam turpis dictum nibh, ut mollis mauris velit sed neque.</p>

                    <p>Maecenas eget finibus purus, sodales venenatis leo. Nulla facilisi. In hac habitasse platea dictumst. Vivamus ornare, mi vitae facilisis placerat, enim mi commodo ipsum, mollis viverra purus elit at mauris. Nam id odio accumsan, condimentum orci vitae, venenatis nisi. Nulla elementum aliquet eros eget malesuada. Suspendisse tempor, justo et sagittis bibendum, lacus metus porttitor lectus, et tristique purus quam vitae tortor.</p>
                </div>
            </div>
        </main>
    )
}

export default Nosotros
