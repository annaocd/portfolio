import React, { Component } from 'react'
import '../../stylesheets/app.scss'

let Snap
try {
  Snap = require('imports?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js')
} catch(e) {
  Snap = require('snapsvg')
}

var SVG = function (h,w) {
 var NS="http://www.w3.org/2000/svg";
 var svg=document.createElementNS(NS,"svg");
 svg.width=w;
 svg.height=h;
 return svg;
}

class Squares extends Component {

  constructor (props) {
    super(props)
    this.state = {
      points: [],
      selectedPoints: [],
      players: [],
      currentPlayerIndex: null,
      needsGrid: true
    }
  }

  componentDidMount () {
    this.createPointGrid()
    this.setState({needsGrid: false})
  }

  drawLine (x, y) {
    const { selectedPoints } = this.state
    let s = Snap('#svg-grid')
    const linePath = 'M' + selectedPoints[0].x + ' ' + selectedPoints[0].y + 'L' + selectedPoints[1].x + ' ' + selectedPoints[1].y + 'Z'
    const lineLength = Snap.path.getTotalLength(linePath)
    const lineDraw = s.path(linePath)

    lineDraw.attr({
        fill:'none',
        stroke:'#39d6b4',
        'stroke-dasharray': lineLength + ' ' + lineLength,
        'stroke-dashoffset': lineLength,
        'stroke-width': 7,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-miterlimit': 10
    })

    lineDraw.animate({
        strokeDashoffset: 0
    }, 500, mina.easeinout)

    this.clearSelectedPoints()
  }

  drawDot (point) {
    let s = Snap('#svg-grid')
    const radius = 7
    const x = point.x + radius
    const y = point.y + radius
    const disc = s.circle(x, y, radius)

    disc
      .click((e) => {
        //disc.toggleClass('clicked')
        if (disc.data('isClicked')) {
          disc.data({
            isClicked: false
          })
          disc.animate({
            r: radius,
            fill: '#000',
            stroke: 'none',
            fillOpacity: 1,
            strokeOpacity: 0,
            strokeWidth: 0
          }, 200, mina.easeinout)
        } else {
          disc.data({
            isClicked: true
          })
          disc.animate({
            fill: '#39d6b4',
            stroke: 'none',
            fillOpacity: 1,
            strokeOpacity: 0,
            strokeWidth: 0
          }, 200, mina.easeinout)
        }
        this.onPointClick.call(this, e)
      })
      .mouseover((thing) => {
        if (!disc.data('isClicked')) {
          disc.animate({
            r: radius + 1,
            fill: '#000',
            stroke: '#39d6b4',
            fillOpacity: 1,
            strokeOpacity: .5,
            strokeWidth: radius - 3
          }, 200, mina.easeinout)
        }
      })
      .mouseout((thing) => {
        if (!disc.data('isClicked')) {
          disc.animate({
            r: radius,
            fill: '#000',
            stroke: 'none',
            fillOpacity: 1,
            strokeOpacity: 0,
            strokeWidth: 0
          }, 200, mina.easeinout)
        }

      })
  }

  createPointGrid () {
    const columnCount = 10
    const rowCount = 5
    const columnWidth = 30
    const rowHeight = 30

    for (let x = 0; x < columnCount; x++) {
      for (let y = 0; y < rowCount; y++) {
        this.addPoint({
          x: x * rowHeight,
          y: y * columnWidth
        })
      }
    }
  }

  addPoint (point) {
    this.setState((prevState, props) => {
      return {
        points: [...prevState.points, point]
      }
    })
  }

  addSelectedPoints (point) {
    this.setState((prevState, props) => {
      return {
        selectedPoints: [...prevState.selectedPoints, point]
      }
    })
    console.log('add', this.state.selectedPoints)
  }

  removeSelectedPoints (point) {
    this.setState((prevState, props) => {
      return {
        selectedPoints: prevState.selectedPoints.filter((thing) => {
          return thing.x !== point.x && thing.y !== point.y
        })
      }
    })
    console.log('remove', this.state.selectedPoints)
  }

  clearSelectedPoints (point, shouldReset) {
    this.setState((prevState, props) => {
      return {
        selectedPoints: []
      }
    })
  }

  onPointClick (e) {
    const point = {
      x: e.target.cx.baseVal.value,
      y: e.target.cy.baseVal.value
    }

    const matchedPoint = this.state.selectedPoints.filter((coord) => {
      return coord.x === point.x && coord.y === point.y
    })

    if (matchedPoint.length) {
      this.removeSelectedPoints(point)
    } else {
      this.addSelectedPoints(point)
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.state.points !== nextState.points || this.state.selectedPoints !== nextState.selectedPoints
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.selectedPoints.length === 2) {
      console.log('WILL DRAW', this.state.selectedPoints[0], this.state.selectedPoints[1])
      this.drawLine()
    }
  }

  render() {
    const { points } = this.state
    return (
      <Grid points={points} />
      <svg id='svg-grid'>
        {points.map((point, i) => this.drawDot(point))}
      </svg>
    )
  }
}

// <circle
//   key={i}
//   cx={point.x + radius}
//   cy={point.y + radius}
//   r={radius-3}
//   onClick={this.onPointClick.bind(this)} />
export default Squares
