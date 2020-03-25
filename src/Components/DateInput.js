import React from 'react'


export const days = {
	'Enero': 31,
	'Febrero': 29,
	'Marzo': 31,
	'Abril': 30,
	'Mayo': 31,
	'Junio': 30,
	'Julio': 31,
	'Agosto': 31,
	'Septiembre': 30,
	'Octubre': 31,
	'Noviembre': 30,
	'Diciembre': 31
}

export const leap_years = [
	1904, 1908, 1912, 1916, 1920, 1924, 1928, 1932, 1936, 1940, 1944, 1948, 1952, 1956, 1960, 
	1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020
].map(y => String(y))


const months = [
	'Enero',
	'Febrero',
	'Marzo',
	'Abril',
	'Mayo',
	'Junio',
	'Julio',
	'Agosto',
	'Septiembre',
	'Octubre',
	'Noviembre',
	'Diciembre'
]

const years = [...Array(121)].map((_,i) => new Date().getFullYear() - i)
export const DateInput = ({ date, setDate }) => <div style={{display:'inline-flex'}}>
    <div className="field">
        <div className="control">
            <div className="select is-info">
                <select value={date.day} onChange={({ target }) => setDate({ ...date, day: target.value })} >
                    <option hidden value=''>Día</option>
                    { [...Array(31)].map((_, i) => <option key={`day-${i}`}> { i + 1 } </option>)}
                </select>
            </div>
        </div>
    </div>
    <div className="field">
        <div className="control">
            <div className="select is-info">
                <select value={date.month} onChange={({ target }) => setDate({ ...date, month: target.value })} >
                    <option hidden value=''>Mes</option>
                    { months.map((m, i) => <option key={`month-${i}`}> { m } </option>)}
                </select>
            </div>
        </div>
    </div>
    <div className="field">
        <div className="control">
            <div className="select is-info">
                <select value={date.year} onChange={({ target }) => setDate({ ...date, year: target.value })} >
                    <option hidden value=''>Año</option>
                    { years.map((y, i) => <option key={`year-${i}`}> { y } </option>)}
                </select>
            </div>
        </div>
    </div>
</div>
