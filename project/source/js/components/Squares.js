import React, { Component } from 'react'
import '../../stylesheets/components/squares.scss'

let Snap
try {
  Snap = require('imports?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js')
} catch(e) {
  Snap = require('snapsvg')
}

class Squares extends Component {

  constructor (props) {
    super(props)
    this.state = {
      points: [],
      selectedPoints: [],
      lines: [],
      latestSquares: [],
      players: this.createPlayers(),//[],
      currentPlayerIndex: 0,
      totalSquareCount: 0
    }

    this.potentialPoints = []
    this.spacerWidth = 50
    this.discRadius = 6
    this.discRadiusMax = this.discRadius + 3
    this.columnCount = 6
    this.rowCount = 4
    this.totalPossibleSquares = (this.columnCount - 1) * (this.rowCount - 1)
  }

  setCurrentPlayerIndex () {
    this.setState({
      currentPlayerIndex: this.state.currentPlayerIndex === (this.state.players.length - 1) ? 0 : (this.state.currentPlayerIndex + 1)
    })
  }

  getCurrentPlayer () {
    return this.state.players[this.state.currentPlayerIndex]
  }

  createPlayers () {
    return [{
      name: 'slarp',
      color: '#5deac6',
      totalSquareCount: 0,
      symbol: 'P1'
    },
    {
      name: 'zobo',
      color: '#fb65fb',
      totalSquareCount: 0,
      symbol: 'P2'
    }]
  }

  drawLine (linePath) {
    const { selectedPoints, lines } = this.state
    const currentPlayer = this.getCurrentPlayer()

    let s = Snap('#svg-grid')
    const lineLength = Snap.path.getTotalLength(linePath)
    const lineDraw = s.path(linePath)

    lineDraw.attr({
        id: linePath.replace(/ /g, '_'),
        fill: 'none',
        stroke: currentPlayer.color,
        'stroke-dasharray': lineLength + ' ' + lineLength,
        'stroke-dashoffset': lineLength,
        'stroke-width': this.discRadius + 2,
        'stroke-linecap': 'round',
        // 'stroke-linejoin': 'round'
    }).prependTo(s).animate({
        strokeDashoffset: 0
    }, 400, mina.easeinout)
  }

  createPointGrid () {
    for (let x = 0; x < this.columnCount; x++) {
      for (let y = 0; y < this.rowCount; y++) {
        this.addPoint({
          x: (x * this.spacerWidth) + (this.discRadiusMax * 2),
          y: (y * this.spacerWidth) + (this.discRadiusMax * 2)
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

  addSelectedPoint (point) {
    this.setState((prevState, props) => {
      return {
        selectedPoints: [...prevState.selectedPoints, point]
      }
    })
  }

  removeSelectedPoint (point) {
    this.setState((prevState, props) => {
      return {
        selectedPoints: prevState.selectedPoints.filter((currentPoint) => {
          return currentPoint.x !== point.x && currentPoint.y !== point.y
        })
      }
    })
  }

  addLine () {
    const { selectedPoints } = this.state
    let s = Snap('#svg-grid')

    const discs = [...s.selectAll('circle')].forEach((disc) => {
      this.resetStyle(Snap(disc))
    })

    this.setState((prevState, props) => {
      return {
        lines: [...prevState.lines, this.getLineProps(selectedPoints)],
        selectedPoints: []
      }
    })
  }

  getLineProps (points) {
    return {
      x1: Math.min(points[0].x, points[1].x),
      y1: Math.min(points[0].y, points[1].y),
      x2: Math.max(points[0].x, points[1].x),
      y2: Math.max(points[0].y, points[1].y),
      path: this.getLineString(points)
    }
  }

  getLineString (points) {
    return 'M' + points[0].x + ' ' + points[0].y + 'L' + points[1].x + ' ' + points[1].y
  }

  // --- squares --- //
  findSquares () {
    const { lines, players, totalSquareCount, currentPlayerIndex } = this.state

    if (lines.length < 3) { return totalSquareCount }

    let squares = []
    const currentLine = lines[lines.length-1]
    const isVertical = currentLine.x1 === currentLine.x2
    const isHorizontal = currentLine.y1 === currentLine.y2

    if (isHorizontal) {
      squares.push(...this.findTopSquare(currentLine), ...this.findBottomSquare(currentLine))
    } else if (isVertical) {
      squares.push(...this.findLeftSquare(currentLine), ...this.findRightSquare(currentLine))
    }

    if (squares.length && squares.length % 3 === 0) {
      const currentSquareCount = (squares.length / 3)
      this.fillSquares(squares.concat(currentLine))
      this.setState({
        totalSquareCount: totalSquareCount + currentSquareCount,
        players: players.map((player, i) => {
          if (i === currentPlayerIndex) {
            player.totalSquareCount = player.totalSquareCount + currentSquareCount
          }
          return player
        })
      })

      return (currentSquareCount + totalSquareCount)
    }

    return totalSquareCount
  }

  findTopSquare (currentLine) {
    const { lines } = this.state
    const square = lines.filter((line) => {
      return (
        ((line.x1 === currentLine.x1 && line.y1 === currentLine.y1 - this.spacerWidth) &&
        (line.x2 === currentLine.x1 && line.y2 === currentLine.y1)) ||

        ((line.x1 === currentLine.x1 && line.y1 === currentLine.y1 - this.spacerWidth) &&
        (line.x2 === currentLine.x2 && line.y2 === currentLine.y1 - this.spacerWidth)) ||

        ((line.x1 === currentLine.x2 && line.y1 === currentLine.y1 - this.spacerWidth) &&
        (line.x2 === currentLine.x2 && line.y2 === currentLine.y2))
      )
    })

    return square.length === 3 ? square : []
  }

  findBottomSquare (currentLine) {
    const { lines } = this.state
    const square = lines.filter((line) => {
      return (
        ((line.x1 === currentLine.x1 && line.y1 === currentLine.y1) &&
        (line.x2 === currentLine.x1 && line.y2 === currentLine.y1 + this.spacerWidth)) ||

        ((line.x1 === currentLine.x1 && line.y1 === currentLine.y1 + this.spacerWidth) &&
        (line.x2 === currentLine.x2 && line.y2 === currentLine.y1 + this.spacerWidth)) ||

        ((line.x1 === currentLine.x2 && line.y1 === currentLine.y2) &&
        (line.x2 === currentLine.x2 && line.y2 === currentLine.y1 + this.spacerWidth))
      )
    })

    return square.length === 3 ? square : []
  }

  findLeftSquare (currentLine) {
    const { lines } = this.state
    const square = lines.filter((line) => {
      return (
        ((line.x1  === currentLine.x1 - this.spacerWidth && line.y1 === currentLine.y1) &&
        (line.x2 === currentLine.x1 && line.y2 === currentLine.y1)) ||

        ((line.x1 === currentLine.x1 - this.spacerWidth && line.y1 === currentLine.y1) &&
        (line.x2 === currentLine.x1 - this.spacerWidth && line.y2 === currentLine.y2)) ||

        ((line.x1 === currentLine.x1 - this.spacerWidth && line.y1 === currentLine.y2) &&
        (line.x2 === currentLine.x2 && line.y2 === currentLine.y2))
      )
    })

    return square.length === 3 ? square : []
  }

  findRightSquare (currentLine) {
    const { lines } = this.state
    const square = lines.filter((line) => {
      return (
        ((line.x1 === currentLine.x1 && line.y1 === currentLine.y1) &&
        (line.x2 === currentLine.x1 + this.spacerWidth && line.y2 === currentLine.y1)) ||

        ((line.x1 === currentLine.x1 + this.spacerWidth && line.y1 === currentLine.y1) &&
        (line.x2 === currentLine.x1 + this.spacerWidth && line.y2 === currentLine.y2)) ||

        ((line.x1 === currentLine.x2 && line.y1 === currentLine.y2) &&
        (line.x2 === currentLine.x1 + this.spacerWidth && line.y2 === currentLine.y2))
      )
    })

    return square.length === 3 ? square : []
  }

  fillSquares (squares) {
    // update lines stroke
    let s = Snap('#svg-grid')
    const paths = '#' + squares.map((line) => {
      return line.path.replace(/ /g, '_')
    }).join(', #')

    const currentLines = s.selectAll(paths).animate({
        stroke: this.getCurrentPlayer().color,
        strokeOpacity: '0.6'
    }, 500, mina.easeinout)

    // add filled square(s) at smallest coordinate
    const linesPerSquare = 3
    const repeatAmount = (squares.length - 1) / 3 // currentLine is concat'd with squares array making 1 extra

    for (let i = 0; i < repeatAmount; i++) {
      const startIndex = i * linesPerSquare
      const endIndex = (startIndex + linesPerSquare) - 1

      let latestSquares = squares.slice(startIndex, endIndex)
      let minX = latestSquares[0].x1
      let minY = latestSquares[0].y1
      latestSquares.forEach((elem) => {
        if (elem.x1 < minX) {
          minX = elem.x1
        }
        if (elem.y1 < minY) {
          minY = elem.y1
        }
      })

      const squareSize = this.spacerWidth - this.discRadius
      const radiusMod = this.discRadius / 2
      const insideX = minX + radiusMod
      const insideY = minY + radiusMod
      const r0 = s.rect(insideX, insideY, squareSize, squareSize).prependTo(s).attr({
        fill: this.getCurrentPlayer().color,
        opacity: '0',
        height: 0,
        y: (insideY + squareSize)
      }).animate({
          opacity: '0.9',
          height: squareSize,
          y: insideY
      }, 500, mina.easeinout)
    }
  }

  // --- dot (point) states --- //
  resetStyle (disc) {
    disc.data({
      isClicked: false
    })
    disc.animate({
      r: this.discRadius,
      fill: '#000',
      stroke: 'none',
      fillOpacity: 1,
      strokeOpacity: 0,
      strokeWidth: 0
    }, 200, mina.easeinout)
  }

  addHoverStyle (disc) {
    disc.animate({
      r: this.discRadius + 2,
      fill: '#000',
      stroke: this.getCurrentPlayer().color,
      fillOpacity: 1,
      strokeOpacity: .5,
      strokeWidth: this.discRadiusMax
    }, 200, mina.easeinout)
  }

  addClickStyle (disc) {
    disc.data({
      isClicked: true
    })
    disc.animate({
      r: this.discRadius,
      fill: this.getCurrentPlayer().color,
      stroke: 'none',
      fillOpacity: 1,
      strokeOpacity: 0,
      strokeWidth: 0
    }, 200, mina.easeinout)
  }

  onPointClick (e) {
    const point = {
      x: e.target.cx.baseVal.value,
      y: e.target.cy.baseVal.value,
      disc: Snap('#' + e.target.id)
    }

    const matchedPoint = this.state.selectedPoints.filter((coord) => {
      return coord.x === point.x && coord.y === point.y
    })

    if (matchedPoint.length) {
      this.removeSelectedPoint(point)
    } else {

      if (!this.isPotentialPoint(point)) {
        this.resetStyle(this.state.selectedPoints[0].disc)
        this.removeSelectedPoint(this.state.selectedPoints[0])
      }

      this.addSelectedPoint(point)
    }
  }

  isPotentialPoint (selectedPoint) {
    const potentialPoint = this.potentialPoints.find((point) => {
      return point.x == selectedPoint.x && point.y == selectedPoint.y
    })
    if (!this.state.selectedPoints.length || (this.potentialPoints.length && potentialPoint)) {
      return true
    }
    return false
  }

  findPotentialPoints (selectedPoint) {
    const { points, lines } = this.state

    let potentialPoints = points.filter((point) => {
      return (
        point.x === selectedPoint.x &&
        (point.y === selectedPoint.y - this.spacerWidth || point.y === selectedPoint.y + this.spacerWidth) ||
        point.y === selectedPoint.y &&
        (point.x === selectedPoint.x - this.spacerWidth || point.x === selectedPoint.x + this.spacerWidth)
      )
    })

    if (lines.length) {
      potentialPoints = potentialPoints.filter((point) => {
        const potentialLine = this.getLineProps([selectedPoint, point])
        const existingLine = lines.find((line) => {
          return (
            line.x1 === potentialLine.x1 &&
            line.y1 === potentialLine.y1 &&
            line.x2 === potentialLine.x2 &&
            line.y2 === potentialLine.y2
          )
        })
        return !existingLine
      })
    }

    this.potentialPoints = potentialPoints
  }

  findWinner () {
    const { players } = this.state
    let ties = []
    let winnerIndex = 0
    let totalSquareCount = 0

    players.forEach((player, i) => {
      if (player.totalSquareCount === 0) { return }
      if (player.totalSquareCount > totalSquareCount) {
        winnerIndex = i
        totalSquareCount = player.totalSquareCount
      } else if (player.totalSquareCount === totalSquareCount) {
        ties.push(winnerIndex, i)
      }
    })

    if (ties.length === players.length) {
      alert('Players tied with ' + totalSquareCount + ' each')
    } else {
      alert(players[winnerIndex].name + ' WON with ' + players[winnerIndex].totalSquareCount + ' SQUARES')
    }
  }

  // --- dot (point) events --- //
  onMouseOver (e) {
    let disc = Snap('#' + e.target.id)
    if (!disc.data('isClicked')) {
      this.addHoverStyle(disc)
    }
  }

  onMouseOut (e) {
    let disc = Snap('#' + e.target.id)
    if (!disc.data('isClicked')) {
      this.resetStyle(disc)
    }
  }

  onClick (e) {
    let disc = Snap('#' + e.target.id)
    const isClicked = disc.data('isClicked')

    if (!isClicked) {
      this.addClickStyle(disc)
    } else {
      this.resetStyle(disc)
    }

    this.onPointClick(e)
  }

  // --- form events -- //
  onSubmit (e) {
    e.preventDefault()
    const player = {
      name: e.target.elements['name'].value,
      color: e.target.elements['color'].value,
      totalSquareCount: 0
    }
    this.addPlayer(player)
  }

  addPlayer (player) {
    this.setState((prevState, props) => {
      return {
        players: [...prevState.players, player]
      }
    })
  }

  componentDidUpdate (prevProps, prevState) {
    const { selectedPoints, totalSquareCount } = this.state

    if (selectedPoints.length === 1) {
      this.findPotentialPoints(selectedPoints[0])
    } else if (selectedPoints.length === 2) {
      this.drawLine(this.getLineString(selectedPoints))
      this.addLine()
    } else if (prevState.selectedPoints.length === 2 && selectedPoints.length === 0) {
      const currentSquareCount = this.findSquares()

      // if square count hasn't changed, change player
      if (currentSquareCount === this.totalPossibleSquares) {
        this.findWinner()
      } else if (currentSquareCount === totalSquareCount) {
        this.setCurrentPlayerIndex()
      }
    }
  }

  componentDidMount () {
    this.createPointGrid()
  }

  render () {
    const { points, players, currentPlayerIndex } = this.state
    //♚ ♛ ♜ ♝ ♞ ♟ ♔ ♕ ♖ ♗ ♘ ♙

    /*
    <form onSubmit={this.onSubmit.bind(this)}>
      <input type='text' name='name' placeholder='name' />
      <input type='color' name='color' />
      <input type='submit' />
    </form>
    */

    return (
      <div className='squares'>
        <svg id='svg-grid'>
          {points.map((point, i) =>
            <circle cx={point.x} cy={point.y} r={this.discRadius} key={i} id={`c-${i}`}
              onMouseOver={this.onMouseOver.bind(this)}
              onMouseOut={this.onMouseOut.bind(this)}
              onClick={this.onClick.bind(this)}
             />
          )}
        </svg>
        <ul className='player-list'>
          {players.map((player, i) =>
            <li className={currentPlayerIndex === i ? `player-list__item is-turn` : `player-list__item`} key={i}>
              <span className='player-item__symbol' style={{color: player.color}} >{player.symbol}</span>
              <span className='player-item__total'>{player.totalSquareCount}</span>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default Squares
