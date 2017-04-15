import React from 'react'
import cx from 'bem-classnames'
import '../../stylesheets/components/aspect-ratio.scss'

function AspectRatio (props) {
  let classes = {
      name: 'aspect-ratio ' + props.className,
      states: ['absolute', 'exiting', 'pressed']
  }

  //TODO: make backgroundImage conditional per props.image
  return (
    <div className={cx(classes, { absolute: props.isAbsoluteParent })}>
      <span className='aspect-ratio__spacer' style={{ paddingTop: props.ratio + '%'}}></span>
      <div className='aspect-ratio__content' style={props.image && { backgroundImage: 'url(' + props.image + ')'}}>
        {props.children}
      </div>
    </div>
  )
}

export default AspectRatio
