import React from 'react'
import cx from 'bem-classnames'

import '../../stylesheets/components/greeting.scss'

function getGreeting () {
  const timestamp = new Date()
  const hours = timestamp.getHours()
  let greeting = {
    isMorning: false,
    isAfternoon: false,
    isEvening: false,
    isLate: false,
    message: ''
  }

  if (hours <= 4) {
    greeting = Object.assign(greeting, {
      isLate: true,
      message: 'Greetings nightcrawler'
    })
  } else if (hours < 12) {
    greeting = Object.assign(greeting, {
      isMorning: true,
      message: 'Good mornin\''
    })
  } else if (hours >= 12 && hours < 17) {
    greeting = Object.assign(greeting, {
      isAfternoon: true,
      message: 'Good afternoon'
    })
  } else {
    greeting = Object.assign(greeting, {
      isEvening: true,
      message: 'Evenin\''
    })
  }

  return greeting
}

function Greeting (props) {
  let classes = {
      name: 'greeting',
      modifiers: ['morning', 'afternoon', 'evening', 'late']
  }

  const greeting = getGreeting()

  return (
    <span className={cx(classes, {
        morning: greeting.isMorning,
        afternoon: greeting.isAfternoon,
        evening: greeting.isEvening,
        late: greeting.isLate
      })}>{ greeting.message }</span>
  )
}

export default Greeting
