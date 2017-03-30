import React from 'react'

import '../../stylesheets/components/date-range.scss'

function DateRange (props) {
  const { dateStart, dateEnd } = props.content

  const startMonth = dateStart.split(' ')[0]
  const startYear = dateStart.split(' ')[1]
  const endMonth = dateEnd.split(' ')[0]
  const endYear = dateEnd.split(' ')[1]


  return (
    <span className='date-range'>
      <span className='date-range__month'>{startMonth}</span>
      <span className='date-range__year'>{startYear}</span>
      <span className='date-range__month'>{endMonth}</span>
      <span className='date-range__year'>{endYear}</span>
    </span>
  )
}

export default DateRange
