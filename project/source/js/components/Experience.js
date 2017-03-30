import React from 'react'
import DateRange from '../components/DateRange'

function Experience (props) {
  const { header, list } = props.content
  return (
    <section className="experience">
      <h2>{header}</h2>
      <ul>
        {list.map((row, a) => (
          <li key={a}>
            <h3>{row.company} <DateRange content={row} /></h3>
            <ul>
              {row.roles.map((role, b) => (
                <li key={b}>{role.title} <DateRange content={role} /></li>
              ))}
            </ul>
            <ul>
              {row.contributions.map((item, b) => (
                <li key={b}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Experience
