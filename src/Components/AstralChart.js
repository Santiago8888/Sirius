import React, { Component } from 'react'
import { select } from "d3-selection"
import { arc } from 'd3-shape'


const x_center = 300
const y_center = 300
const radius = 100
const circles = [100, 103, 120, 123, 260, 270, 297, 300]
const colors = ['#FFFEDD', '#FDEDF6', '#E0FCDF', '#DFFFF9']
const house_colors = ['#E0FCDF', '#DFFFF9', '#FFFEDD', '#FDEDF6']
const deep_colors = ['#950193', '#B16148', '#1528B2', '#054D1B']
const sign_names = [ 'Cap', 'Sag', 'Sco', 'Lib', 'Vir', 'Leo', 'Can', 'Gem', 'Tau', 'Ari', 'Pis', 'Aqu' ]
const sign_imgs = sign_names.map(sign => `/signs/${sign}.png`) 

const planet_names = [ 
    'Sun', 
    'Moon', 
    'Mercury', 
    'Venus', 
    'Mars', 
    'Jupiter', 
    'Saturn', 
    'Uranus', 
    'Neptune', 
    'Pluto', 
    'North Node', 
    'South Node'
]

const planet_imgs = [...planet_names.filter((_, i) => i < 10), 'Node', 'Node'].map(i => `planets/${i}`)
const get_element = (color) => ({ '#950193': 'fire', '#B16148': 'terra', '#1528B2': 'air', '#054D1B': 'water' })[color]


const get_arc_middle = ({ grade_one, grade_two, depth }) => ({
  x: Math.sin((grade_one + (grade_two - grade_one)/2)*Math.PI/180)*depth + 300,
  y: Math.cos((grade_one + (grade_two - grade_one)/2)*Math.PI/180)*depth + 300
})

const get_new_arc_middle = ({ grade_one, grade_two, depth }) => ({
  x: Math.sin((grade_one + (grade_two - grade_one)/2)*Math.PI/180)*depth + 300,
  y: 300 - Math.cos((grade_one + (grade_two - grade_one)/2)*Math.PI/180)*depth
})

const get_x = (id, x) => ({
  0: -10, 1: -8, 2: -6, 3: 3, 4: -2, 5: -6, 6: -6, 7: -6, 8: -4, 9: -2, 10: -11, 11: -13, 12: -10
})[id || 12] + x

const get_y = (id, y) => ({
  0: -12, 1: -14, 2: -12, 3: -6, 4: 0, 5: 0, 6: -6, 7: -6, 8: -4, 9: 2, 10:-6, 11:-14, 12: -10
})[id || 11] + y

const find_conjunctions = (planets) => planets.map(({degree: i, name: n}) => planets
  .filter(({degree: j}) => (i - j) > 0 && 10 > (i - j))
  .map(({ degree: j, name: m }) => [{planet: n, degree: i, color:'green'}, {planet: m, degree: j, color:'green'}])
).flat()

const find_semi_sextils = (planets) => planets.map(({degree: i, name: n}) => planets
  .filter(({degree: j }) => (i - j) > 28 && 32 > (i - j))
  .map(({ degree: j, name: m }) => [{planet: n, degree: i, color:'green'}, {planet: m, degree: j, color:'green'}])
).flat()

const find_sextils = (planets) => planets.map(({degree: i, name: n}) => planets
  .filter(({degree: j }) => (i - j) > 57 && 63 > (i - j))
  .map(({ degree: j, name: m }) => [{planet: n, degree: i, color:'green'}, {planet: m, degree: j, color:'green'}])
).flat()

const find_cuadratures = (planets) => planets.map(({degree: i, name: n}) => planets
  .filter(({degree: j }) => (i - j) > 82 && 98 > (i - j) || (i - j) > 262 && 278 > (i - j))
  .map(({ degree: j, name: m }) => [{planet: n, degree: i, color:'red'}, {planet: m, degree: j, color:'red'}])
).flat()

const find_trigons = (planets) => planets.map(({degree: i, name: n}) => planets
  .filter(({degree: j }) => (i - j) > 114 && 126 > (i - j) || (i - j) > 234 && 246 > (i - j))
  .map(({ degree: j, name: m }) => [{planet: n, degree: i, color:'green'}, {planet: m, degree: j, color:'green'}])
).flat()

const find_quintiles = (planets) => planets.map(({degree: i, name: n}) => planets
  .filter(({degree: j }) => (i - j) > 147 && 153 > (i - j) || (i - j) > 207 && 213 > (i - j))
  .map(({ degree: j, name: m }) => [{planet: n, degree: i, color:'blue'}, {planet: m, degree: j, color:'blue'}])
).flat()

const find_oppositions = (planets) => planets.map(({degree: i, name: n}) => planets
  .filter(({degree: j }) => (i - j) > 170 && 190 > (i - j))
  .map(({ degree: j, name: m }) => [{planet: n, degree: i, color:'#FF0090'}, {planet: m, degree: j, color:'#FF0090'}])
).flat()

const get_all_aspects = (planets) => [ ...find_conjunctions(planets), ...find_semi_sextils(planets), 
  ...find_sextils(planets), ...find_cuadratures(planets), ...find_trigons(planets), ...find_quintiles(planets),
  ...find_oppositions(planets).reduce((d, i, idx, l) => idx < l.length - 1 ? [...d, i] : d, [])
]

const get_x_coord = ({degree}) => x_center + Math.cos((degree + 192) *Math.PI/180)*radius 
const get_y_coord = ({degree}) => y_center + Math.sin((degree + 372) *Math.PI/180)*radius
const get_origin = ({degree, color}) => ({ x: get_x_coord({degree}), y: get_y_coord({degree}), color })
const get_aspect_coords = (aspect) => aspect.map(({ degree, color }) => get_origin({ degree, color }))

const map_planets =(planets) => planets.map(({house, degrees, text}, idx) => ({ 
    house: house, 
    text: text, 
    degree: house*30 + degrees, 
    name: planet_names[idx], 
    path: planet_imgs[idx], 
    color: deep_colors[(house + 3) % 4]
}))

const dynamic_x_coord = ({degree, r }) => x_center + Math.cos((degree + 192)* Math.PI/180)*r
const dynamic_y_coord = ({degree, r }) => y_center + Math.sin((degree + 372)* Math.PI/180)*r
const get_dynamic_coords = ({degree, color}, r) => ({ 
    x: dynamic_x_coord({degree, r:r}), y: dynamic_y_coord({degree, r:r}), color 
})

const are_planets_close = planets => !!planets.find(({ degree }) => 
  planets.find(({ degree: deg }) => degree - deg < 9 && degree - deg > 0)
)


class AstralChart extends Component {
  state = {
    ascendant: null,
    planets: null,
    houses:null
  }


  async componentDidMount(){
    const { ascendant, houses, planets } = this.props
    this.setState({ ascendant, houses, planets: map_planets(planets)}, () => this.draw_chart())
  }

  draw_circle = (svg, r) => svg.append('circle')
    .style('stroke', '#ADD8E6').style('fill', 'rgba(0,0,0,0)')
    .attr('r', r).attr('cx', 300).attr('cy', 300)

  new_arc = (startAngle, endAngle, innerRadius, outerRadius) => arc().innerRadius(innerRadius)
    .outerRadius(outerRadius).startAngle(startAngle * (Math.PI/180)).endAngle((endAngle || startAngle)* (Math.PI/180))

  draw_arc = (svg, {startAngle, endAngle, innerRadius, outerRadius, fill}) => svg.append('path')
    .attr('d', this.new_arc(startAngle, endAngle, innerRadius, outerRadius)).attr('transform', 'translate(300,300)')
    .style('stroke', 'ADD8E6').style('fill', fill || 'rgba(0,0,0,0)')

  create_text = (svg, {x, y}, text, color) => svg.append('text').text(text)
    .attr('transform', `translate(
        ${ x > 300 ? text !== 6 && text !== 7 ? x - 1 : text === 7 ? x - 5 : x - 4 : text !== 1 ? x - 8 : x - 3}, 
        ${ y > 300 ? text !== 3 && text !== 4 ? y : y + 3 : text !== 9 && text !== 10 && text !== 11 ? y + 10 : y + 7 })
    `).style('fill', color)

  draw_image = (svg, { x, y }, path, idx) => svg.append('image')
    .attr('xlink:href', path).attr('width', 20).attr('height', 20).attr('x', get_x(idx, x)).attr('y', get_y(idx, y))

  draw_line = (svg, {x1, y1, x2, y2}, color) =>  svg.append("line").style("stroke", color) 
    .attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2)

  draw_aspect = (svg, [{x:x1, y:y1, color}, {x:x2, y:y2}]) => this.draw_line(svg, {x1: x1, x2: x2, y1: y1, y2: y2}, color)
  rotated_text = (svg, {x, y}, {text, color, rotation, pixels}) => svg.append('text').text(text)
    .attr('transform', `translate(${ x }, ${ y }) rotate(${rotation})`).style('fill', color).style("font-size", pixels)

  draw_planet =(svg, planet) => { 
    const { x, y } = get_dynamic_coords({degree: planet.degree}, 150)
    this.draw_image(svg, {x: x, y: y}, `${planet.path}_${get_element([planet.color])}.png`, 12)
    this.rotated_text(svg, {x: x+13+(x-450)/150*(planet.text.split(' ')[0].length < 3 ? 16 : 26), y: y+7+(y-300)/150*26}, 
      {text:planet.text.split(' ')[0], color: planet.color, rotation:355, pixels:'20px'})
    this.draw_image(svg, get_dynamic_coords({degree: planet.degree}, 200), [...sign_imgs].reverse()[(planet.house + 1) % 12], 12)
    this.rotated_text(svg, {x:  x+ 62+(x-450)/2, y: y+3+(y > 300 ? (y-300)/1.8 : (y-300)/2.25)}, 
      {text:planet.text.split(' ')[1], color: planet.color, rotation:355, pixels:'20px'}
    )
  }

  ward_off_planets = (svg, planets) => are_planets_close(planets)
    ? this.ward_off_planets(svg, planets.map(planet => planets.find(({ degree }) => 
      Math.abs(planet.degree - degree) < 9 && 0 < Math.abs(planet.degree -degree))
        ?  planets.find(({ degree }) => planet.degree - degree < 9 && 0 < planet.degree -degree)
          ? {...planet, degree: planet.degree + 1} : {...planet, degree: planet.degree - 1}
        :  planet
      ))
    :  planets.map(planet => this.draw_planet(svg, planet))

  draw_chart = () => {
    const svg = select('#viz').append('svg').attr('width', 900).attr('height', 900)
    circles.map(r => this.draw_circle(svg, r))
    const signs = [...Array(12).keys()].map((_, i) => (i * 30) + 270 + this.state.ascendant)
    signs.map((d, i) => this.draw_arc(svg, {startAngle: d, endAngle: signs[i+1], innerRadius: 260, outerRadius: 300 }))
    signs.map((d, i) => this.draw_arc(svg, {
      startAngle: d, endAngle: signs[i+1] ? signs[i+1] : signs[0] + 360, innerRadius: 270, outerRadius: 297, fill: colors[i%4]
    }))

    const flint = 0
    const houses = [
      ...this.state.houses.reverse().map(h => Math.round(h + flint  - this.state.houses[0] + 710.4) % 360), 
      Math.round(flint - 9.6) % 360
    ]

    houses.filter((_, i) => i < 12).map((d, i) => {
      this.draw_arc(
        svg, 
        {startAngle: d, endAngle: houses[i+1], innerRadius: 103, outerRadius: 120, fill: house_colors[(14-i) % 4]}
      )
      this.draw_arc(svg, {startAngle: d, endAngle: houses[i+1], innerRadius: 100, outerRadius: 260})
    })

    const flent = 430
    houses.reverse().filter((_, i) => i < 24).map((d, i) => this.create_text(svg,
      get_arc_middle({grade_one: d + flent, grade_two: houses[i + 1] + flent, depth: 113}),
      (i+5)%12 + 1, 
      deep_colors[(i+5) %4]
    ))

    signs.map((_, i) => this.draw_image(svg, get_new_arc_middle(
      { grade_one: signs[0] + i*30, grade_two: signs[1] + i*30, depth: 280}), sign_imgs[i], i)
    )

    const aspects = get_all_aspects(this.state.planets)
    aspects.map(aspect => this.draw_aspect(svg, get_aspect_coords(aspect)))
    this.ward_off_planets(svg, this.state.planets)
  }

  render(){
    return (
      <div className="App" style={{margin:'50px 25px'}}>
        <div id='viz'/>
      </div>
    )
  }
}

export default AstralChart
