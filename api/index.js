import swisseph from 'swisseph'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'


swisseph.swe_set_ephe_path (__dirname + './../../ephe')

const { year, month, day, hour } = { year: 1988, month: 8, day: 18, hour: 0.62 }
const jul_day = swisseph.swe_julday(year, month, day, hour, swisseph.SE_GREG_CAL)
const flag = swisseph.SEFLG_SPEED

const { 
    SE_SUN: SUN, 
    SE_MOON: MOON, 
    SE_MERCURY: MERCURY, 
    SE_VENUS: VENUS, 
    SE_MARS: MARS, 
    SE_JUPITER: JUPITER,
    SE_SATURN: SATURN, 
    SE_URANUS: URANUS, 
    SE_NEPTUNE: NEPTUNE, 
    SE_PLUTO: PLUTO, 
    SE_TRUE_NODE: NODE 
} = swisseph

const planets = [ SUN, MOON, MERCURY, VENUS, MARS, JUPITER, SATURN, URANUS, NEPTUNE, PLUTO, NODE ]
const planet_names = [ 'Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Node' ]
const { house } = swisseph.swe_houses(jul_day, 19.4326, -99.1332, 'P')

const get_position = ({planet, day}) => swisseph.swe_calc_ut(day, planet, flag)

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/', (_, res)  => res.send('Hello world'))
app.post('/', ({ body }, res) => {
    const { year, month, day } = body
    const jul_day = swisseph.swe_julday(year, month, day, 18, swisseph.SE_GREG_CAL)

    const planets_position = planets.map(p => get_position({planet: p, day: jul_day}).longitude)
    const planet_response = planets_position.map((p, i) => {
        const degrees = p % 30
        const minutes = 0|(0|(d%1)*60e7)/1e7 // https://stackoverflow.com/a/5786281/6823310
        return {
            name: planet_names[i],
            house: Math.ceil(p/30),
            degress: degrees,
            text: `${Math.floor(degrees)}° ${String(minutes).length == 2 ? minutes : `0${minutes}`}'`
        }
    })

    res.json({
        ascendant: house[0] % 30,
        planets: planet_response,
        houses: house
    })
})


console.log('Running API on Port http://localhost:4000')
app.listen(process.env.PORT || 4000)
