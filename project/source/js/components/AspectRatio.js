import React from 'react'
import cx from 'bem-classnames'
import '../../stylesheets/components/aspect-ratio.scss'

function calculateRatio (width, height) {
  return 100 / (width / height)
}

function getImageSize (image) {
  const img = new Image()
  img.src = image
  return [img.width, img.height]
}

function AspectRatio (props) {
  let classes = {
      name: 'aspect-ratio ' + props.className,
      states: ['absolute', 'exiting', 'pressed']
  }

  const imgSize = getImageSize(props.image)
  const imgWidth = imgSize[0]
  const imgHeight = imgSize[1]

  //TODO: make backgroundImage conditional per props.image
  return (
    <div className={cx(classes, { absolute: props.isAbsoluteParent })}>
      <span className='aspect-ratio__spacer' style={{ paddingBottom: calculateRatio(imgWidth, imgHeight) + '%'}}></span>
      <div className='aspect-ratio__content' style={props.image && { backgroundImage: 'url(' + props.image + ')'}}>
        {props.children}
      </div>
    </div>
  )
}

export default AspectRatio
