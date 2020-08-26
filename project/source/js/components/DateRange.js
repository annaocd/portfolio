import React from 'react'

import '../../stylesheets/components/date-range.scss'

function DateRange (props) {
  const { dateStart, dateEnd } = props.content

  const startMonth = dateStart.split(' ')[0]
  const startYear = dateStart.split(' ')[1]
  const endMonth = dateEnd ? dateEnd.split(' ')[0] : null
  const endYear = dateEnd ? dateEnd.split(' ')[1] : null

  return (
    <span className='date-range'>
      <span className='date-range__month'>{startMonth}</span>
      <span className='date-range__year'>{startYear}</span>
      {endMonth &&
        <span className='date-range__month'>{endMonth}</span>
      }

      {endYear &&
        <span className='date-range__year'>{endYear}</span>
      }

      {!dateEnd &&
        <span>Present</span>
      }

    </span>
  );
}

export default DateRange
