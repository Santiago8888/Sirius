import { Link, Element } from 'react-scroll'
import Particles from 'react-particles-js'
import React, { Fragment, useState } from "react"
import { DateInput, days, leap_years } from './DateInput'
import axios from 'axios'


const FIRST_COLOR = '#4D235F'
const SECOND_COLOR = '#EE9CA0'
const THIRD_COLOR = '#62AAD6'

const CTA_CLASS = "button k-button k-primary raised has-gradient is-fat is-bold"
const CTA_STYLE = { color: 'rgba(102, 51, 153, 1)', borderColor: 'rgba(102, 51, 153, 0.4)', marginTop: 20 }
const CTA_PROPS = {smooth: true, offset: 50, duration: 1000, className: CTA_CLASS }
const CTA = ({ text, to, style }) => <Link to={ to } { ...CTA_PROPS } style={{...CTA_STYLE, ...style}}>
    <span className="text"> { text } </span>
    <span className="front-gradient"></span>
</Link>


const interactivity = { events: { onhover: { enable: true, mode: "repulse" }}}
const particles = { number: { value: 500 }, size: { value: 3 }}
const particle_params = { particles: particles, interactivity: interactivity }

const TITLE_STYLE = { marginBottom:20}
const TITLE_CLASS = "title is-1 is-light is-semibold is-spaced main-title"
const subtitle_props = size => ({ className:`subtitle is-${size} is-light is-thin`, style:{color:'white'}})
export const Hero = ({ src, titles, subtitle, cta }) => <Fragment>
    <img src={src} style={{height:'100vh', zIndex:-1, minWidth:'100%', marginBottom: 0 }} alt={src}/>
    <section className="hero" style={{marginTop: '-100vh', height: '100vh'}}>
        <div className="hero-body" style={{paddingTop: '35vh', height: '100vh', paddingLeft:'10%'}}>
            <h1 className={TITLE_CLASS}  style={TITLE_STYLE}> 
                <span style={{fontSize:'4rem', color:'white'}}> {titles[0]} </span><br/>
                <span style={{color:'white'}}> {titles[1]} </span> 
            </h1>
            <h2 { ...subtitle_props(5) }> { subtitle } </h2>
            <CTA to="sectionTwo" text={cta} />
        </div>
        <Particles params={particle_params} height={'100vh'} style={{marginTop:'-100vh'}}/>
    </section>
</Fragment>


const CARD_IMG_STYLE = { borderRadius: '48%', height:350, width:400, objectPosition: '0% -75px' }
const Card = ({ title, subtitle, src }) => <div className="column">
    <div className="card has-text-centered">
        <div className="card-image"><img src={src} style={CARD_IMG_STYLE} alt={title}/></div>
        <div className="card-content" style={{marginTop:-80}}>
            <p className="title is-3" style={{color: 'white'}}> { title } </p>
            <p className="subtitle is-5" style={{color: FIRST_COLOR}}> { subtitle } </p>
        </div>
    </div>
</div>


const HERO_PROPS = { className:"hero", style:{height:'105vh', zIndex:2, marginTop:'-5vh' }}
const INFO_TITLE_PROPS = {className:"title is-2 is-light is-thin", style:{color:'white', marginBottom: '15vh'}}
export const InfoSection = ({ title, cards, cta }) => <Element name="sectionTwo">
    <section {...HERO_PROPS} style={{...HERO_PROPS.style, backgroundImage: `linear-gradient(${FIRST_COLOR}, ${SECOND_COLOR})`}}>
        <div className="container has-text-centered" style={{marginTop:'20vh', maxWidth:1650, width:'100%'}}>
            <h2 {...INFO_TITLE_PROPS}> { title } </h2>
            <div className="columns is-vcentered" style={{}}>
                {cards.map((card, key) => <Card {...card} key={key}/>)}
            </div>
            <CTA to="sectionThree" text={cta} style={{marginTop:'10vh'}}/>
        </div>
    </section>
</Element>


const CTAForm = ({ titles, labels, cta }) => {
    const [fields, setFields] = useState(labels.reduce((d, i)=>({...d, [i]:''}),{}))
    const [date, setDate] = useState({ day: '', month: '', year: '' })
    const validate_date = ({ day, month, year }) => {
        const is_month_violation = days[month] < day
        const is_leap_violation = day === '29' && month === 'Febrero' && year && !leap_years.includes(year)
        setDate({
            day: !is_month_violation && !is_leap_violation ? day: '',
            month: month,
            year: year
        })
    }

    return <div className="column" style={{padding: '2rem'}}>
        <h2 {...subtitle_props(3)} style={{ marginTop:'30vh', color:'white'}}> { titles[0] } <br/> { titles[1] } </h2>
            <fieldset className="FormGroup">
                { labels.map((label, key) => <div className="FormRow" key={key}>
                    <label className="FormRowLabel"> { label } </label>
                    <input className="FormRowInput" onChange={({target}) => setFields({...fields, [label]: target.value})}/>
                </div>)}
            <div className="FormRow">
                <label className="FormRowLabel"> Fecha </label>
                <DateInput date={date} setDate={validate_date}/>
            </div>
        </fieldset>
        <button 
            className="SubmitButton" 
            type="submit" 
            onClick={async() => {
                console.log('Form', {...fields, date})
                const { data } = await axios.post('http://localhost:4000', {year: 1988, month: 8, day: 17})
                console.log('Data', data)
            }}
        > { cta } </button>
    </div>
}


const ITERACTION_COL_STYLE = {padding:'5% 2%', textAlign:'left', paddingBottom:0}
const CTA_HERO_STYLE = {backgroundImage:`linear-gradient(${SECOND_COLOR}, ${THIRD_COLOR})`, height:'105vh', flexDirection: 'inherit'}
const Iteraction = ({ iteraction }) => <div className="column is-two-thirds" style={ITERACTION_COL_STYLE} > { iteraction }</div>
export const CTASection = ({cta_props, iteraction}) => <Element name="sectionThree">
    <section {...HERO_PROPS} style={CTA_HERO_STYLE}>
        <div className="container has-text-centered" style={{padding:'0% 2%', maxWidth:1650}}>
            <div className="columns is-vcentered" style={{marginTop:'3%'}}>
                <CTAForm {...cta_props}/>
                <Iteraction iteraction={iteraction}/>
            </div>
        </div>
    </section>
</Element>
