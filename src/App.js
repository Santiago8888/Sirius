import { HERO_PROPS, INFO_PROPS, CTA_PROPS } from './Config/Landing'
import { Hero, InfoSection, CTASection } from './Components/Landing'
import React from 'react'
import './index.scss'


const App = () => <div className="App">
	<Hero {...HERO_PROPS}/>
	<InfoSection {...INFO_PROPS}/>
	<CTASection cta_props={CTA_PROPS}/>
</div>



export default App
