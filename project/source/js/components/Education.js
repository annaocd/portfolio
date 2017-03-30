import React from 'react'
import DateRange from '../components/DateRange'

function Education (props) {
  const { header, list } = props.content
  return (
    <section className="education">
      <h2>{header}</h2>
      <ul>
        {list.map((row, a) => (
          <li key={a}>
            <h3>{row.school} <DateRange content={row} /></h3>
            <p>{row.location}</p>
            <ul>
              {row.accolades.map((item, b) => (
                <li key={b}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Education
