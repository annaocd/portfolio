import React from 'react'

function Skills (props) {
  const { header, list } = props.content
  return (
    <section className="skills">
      <h2>{header}</h2>
      <ul>
        {list.map((row, i) => (
          <li key={i}>{row}</li>
        ))}
      </ul>
    </section>
  )
}

export default Skills
