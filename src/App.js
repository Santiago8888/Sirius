import { Hero, InfoSection, CTASection } from './Components/Landing'
import React, { Fragment } from 'react'
import './index.scss'


const HERO_PROPS = {
	src: 'sky.jpg',
	titles: ['Descubre el futuro ', 'según las estrellas'],
	subtitle: 'Comienza a vivir una vida con significado.',
	cta: 'Empieza ahora'
}


const cards = [
	{ title: 'Exploradores', subtitle: 'Buscando una nueva perspectiva de la vida.', src: 'explorer.jpg'},
	{ title: 'Intuitivas', subtitle: 'Que saben que las cosas no son lo que parecen.', src: 'sensitive.jpg'},
	{ title: 'Curiosos', subtitle: 'Y quieren saber de todo con mente abierta.', src: 'curious.jpg'}
]


const INFOSECTION_PROPS = {
	title: '¿Para quién es la Cosmobiología?',
	cards: cards,
	cta: 'Descubre Más'
}


const CTA_PROPS = {
	titles: ['Usa tu fecha de nacimiento', 'para calcular tu Carta Astral'],
	labels: ['Nombre', 'Fecha', 'Año'],
	cta: 'Enviar'
}


const App = () => <div className="App">
	<Hero {...HERO_PROPS}/>
	<InfoSection {...INFOSECTION_PROPS}/>
	<CTASection cta_props={CTA_PROPS} iteraction={<Fragment/>}/>
</div>


export default App
