import React, { PropTypes, Component } from 'react'
import { Motion, spring } from 'react-motion'
import SliderItem from './SliderItem'
import AspectRatio from './AspectRatio'
import '../../stylesheets/components/slider.scss'

var requireSlides = require.context('../../assets/img/slides-peewee', true, /.png$/)
var importSlides = requireSlides.keys().map((key, i) => {
  requireSlides.resolve(key)
  var img = new Image();
  img.src = requireSlides(key);
  return requireSlides(key)
})

const springConfig = {
  stiffness: 200,
  precision: 0.09
}

class Slider extends Component {
  constructor (props) {
    super(props)

    this.content = [
      {
        img: '2017-03-20-14-19-www.netflix.com.png'
      },
      {
        img: '2017-03-20-14-22-www.netflix.com.png'
      },
      {
        img: '2017-03-20-14-30-www.netflix.com.png'
      },
      {
        img: '2017-03-20-14-36-www.netflix.com.png'
      },
      {
        img: '2017-03-20-14-38-www.netflix.com.png'
      },
      {
        img: '2017-03-20-14-39-www.netflix.com.png'
      },
      {
        img: '2017-03-20-14-41-www.netflix.com.png'
      },
      {
        img: '2017-03-20-14-43-www.netflix.com.png'
      },
      {
        img: '2017-03-20-14-44-www.netflix.com.png'
      },
      {
        img: '2017-03-20-14-45-www.netflix.com.png'
      },
      {
        img: '2017-03-20-14-47-www.netflix.com.png'
      },
      {
        img: '2017-03-20-14-53-www.netflix.com.png'
      }
    ]

    this.state = {
      lastItemIndex: 0,
      activeItemIndex: 0,
      previousItemIndex: this.content.length - 1,
      nextItemIndex: 1,
      posOfLastPressed: 0,
      isPressed: false,
      mouseX: 0,
      deltaX:0,
      direction: 0,
      animationEnded: false
    }

    // track X position of tween
    // ommitted from state to prevent state updates during render
    this.motionX = 0

    this.onResize = this.onResize.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
  }

  getStyle (i, motion) {
    const { mouseX, posOfLastPressed, width } = this.state

    const next = posOfLastPressed === this.content.length - 1 ? 0 : posOfLastPressed + 1
    const prev = posOfLastPressed === 0 ? this.content.length - 1 : posOfLastPressed - 1

    let style = {
      transform: `translate(${motion.x}px, 0)`,
    }

    if (i === posOfLastPressed) {

      if (motion.x > width - 1 || motion.x < -(width - 1)) {
        style = Object.assign(style, {
          transform: `translate(0px, 0)`,
          zIndex: ''
        })
      } else {
        style = Object.assign(style, {
          zIndex: this.content.length
        })
      }

      this.motionX = motion.x

    } else if (i === next && this.motionX < 0 || i === prev && this.motionX > 0) {
      style = Object.assign(style, {
        zIndex: this.content.length - 1
      })
    }

    return style
  }

  getMotionStyle (i) {
    const { posOfLastPressed, mouseX } = this.state
    let style = {
      x: 0
    }

    if (i === posOfLastPressed) {
      style = {
        x: spring(mouseX, springConfig)
      }
    }

    return style
  }

  onResize () {
    setTimeout(function () {
      this.setState({ width: this.refs.slider.offsetWidth })
    }.bind(this), 0)
  }

  onMouseMove ({pageX}) {
    const { isPressed, deltaX, mouseX, direction } = this.state

    if (!isPressed) { return }

    const newMouseX = pageX - deltaX
    let newDirection = direction

    if (newMouseX > mouseX) {
      newDirection = -1
    } else if (newMouseX < mouseX) {
      newDirection = 1
    }

    this.setState({
      mouseX: newMouseX,
      direction: newDirection
    })
  }

  onMouseDown (pos, pressX, { pageX }) {
    this.setState({
      deltaX: pageX - pressX,
      mouseX: pressX,
      isPressed: true,
      posOfLastPressed: pos,
      activeItemIndex: pos,
    })
  }

  onMouseUp (e) {
    const { direction, mouseX, width } = this.state
    let newMouseX = mouseX

    // motionX is the x value of current Motion tween
    // motionX provides closer accuracy to user gesture than mouseX
    if (this.motionX > 0 && direction === -1) {
      newMouseX = width
    } else if (this.motionX < 0 && direction === 1) {
      newMouseX = -(width)
    } else {
      newMouseX = 0
    }

    this.setState({
      isPressed: false,
      deltaX: 0,
      mouseX: newMouseX,
      activeItemIndex: null
    })
  }

  onTouchStart(key, pressLocation, e) {
    this.onMouseDown(key, pressLocation, e.touches[0])
  }

  onTouchMove(e) {
    e.preventDefault();
    this.onMouseMove(e.touches[0])
  }

  componentDidMount () {
    this.onResize()
    window.addEventListener('resize', this.onResize)
    window.addEventListener('touchmove', this.onTouchMove)
    window.addEventListener('touchend', this.onMouseUp)
    window.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('mouseup', this.onMouseUp)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize, false)
    window.removeEventListener('touchmove', this.onMouseMove, false)
    window.removeEventListener('touchend', this.onMouseUp, false)
    window.removeEventListener('mousemove', this.onMouseMove, false)
    window.removeEventListener('mouseup', this.onMouseUp, false)
  }

  shouldComponentUpdate (prevProps, prevState) {
    return prevState.width === this.state.width
  }

  render () {
    const { activeItemIndex, isPressed, mouseX } = this.state

    return (
      <div className='slider' ref='slider' id='slider'>
        <ul className='slider__list'>
          {this.content.map((item, i) => {
            return (
              <Motion defaultStyle={{x: 0}} style={this.getMotionStyle(i)} key={i}>
                {style =>
                  <SliderItem
                    key={i}
                    content={item}
                    isPressed={activeItemIndex === i}
                    isEntering={false}
                    onMouseDown={this.onMouseDown.bind(this, i, style.x)}
                    onTouchStart={this.onTouchStart.bind(this, i, style.x)}
                    style={this.getStyle(i, style)}>
                    <AspectRatio ratio={75.06} image={importSlides[i]} isAbsoluteParent={true} />
                  </SliderItem>
                }
              </Motion>
            )
          })}
        </ul>
      </div>
    )
  }
}

Slider.propTypes = {
    //content: PropTypes.array
}

export default Slider

// slide connected
// const style = {
//   transform: `translate(${(width*i)+mouseX}px, 0)`
// }
