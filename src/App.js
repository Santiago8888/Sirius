import { Hero, InfoSection, CTASection } from './Components/Landing'
import React from 'react'
import './index.scss'


const HERO_PROPS = {
	src: 'sky.jpg',
	titles: ['Descubre el futuro ', 'que te cuentan las estrellas'],
	subtitle: 'Comienza a vivir tu vida con un significado más profundo.',
	cta: 'Empieza ahora'
}


const cards = [
	{ title: 'Exploradores', subtitle: 'Buscando una nueva perspectiva de la vida.', src: 'explorer.jpg'},
	{ title: 'Intuitivas', subtitle: 'Que saben que las cosas no son lo que parecen.', src: 'sensitive.jpg'},
	{ title: 'Curiosos', subtitle: 'Y quieren saberlo todo con una mente abierta.', src: 'curious.jpg'}
]


const INFOSECTION_PROPS = {
	title: '¿Para quién es la Cosmobiología?',
	cards: cards,
	cta: 'Descubre Más'
}


const CTA_PROPS = {
	titles: ['Interpreta tu Carta Astral', 'con tu fecha de nacimiento.'],
	labels: ['Nombre'],
	cta: 'Enviar'
}



const App = () => <div className="App">
	<Hero {...HERO_PROPS}/>
	<InfoSection {...INFOSECTION_PROPS}/>
	<CTASection cta_props={CTA_PROPS} iteraction={<div/>}/>
</div>


export default App
