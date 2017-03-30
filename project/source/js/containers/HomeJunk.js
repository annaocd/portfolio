import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import cx from 'bem-classnames'
import * as actions from '../state/modules/content'

import { Motion, spring, StaggeredMotion } from 'react-motion'


import '../../stylesheets/components/home.scss'


const springConfig = {
  stiffness: 200,
  precision: 0.09
}

class Home extends Component {

    static defaultProps = {
      speed: 1,
      scope: 100,
      offset: 0,
    }

    constructor(props) {
      super(props)

      this.state = {
        position: 0
      }
    }

    getClassNames () {
      const { isFetching } = this.props
      const classes = {
          name: 'home',
          states: ['fetching']
      }

      return cx(classes, { fetching: isFetching })
    }

    getStyle (idx, motion) {
      //const {} = this.state

      console.log('style', motion)

      let style = {
        transform: `translate(0, ${motion + (100*idx)}px)`,
      }

      return style
    }

    getMotionStyle (i) {
      const { position } = this.state

      let style = {
        y: spring(i+100, springConfig)
      }

      return style
    }

    onScroll () {
      this.setState({
  			position: this.getPosition(),
  		})
    }

    getPosition = () => {
  		const { scope, offset, speed } = this.props
  		const position = ((window.pageYOffset - this.startOffset) * speed)
      console.log('position', Math.min(-Math.min(scope - offset, position), scope + offset))

  		return Math.min(-Math.min(scope - offset, position), scope + offset)
  	}

    componentWillMount() {
  		this.setState({
  			position: this.getPosition(),
  		})
  	}


    componentDidMount () {
      //window.addEventListener('scroll', this.onScroll.bind(this))

  		this.startOffset = 0
    }

    //<p>I began my career as an intern in early 2006 and learned to perform the duties of web project manager, back and front-end developer and occasional server admin. During two and a half years I helped implement industry best practices while eliminating outdated techniques, successfully managed multiple concurrent development team projects and developed intuitive interfaces in a variety of technologies.</p>
    //<p>My next role at CP+B gave me the opportunity to focus and specialize in front-end development.</p>
    //<p className='text-large'>Patience, perseverence, and people have shaped me into the developer I am today.</p>
    //<a href='/docs/resume.pdf' className='button' download>resume</a>
    render () {
      const defaultStyles = [1,2,3,4].map(() => { return  { y: 0 } })
      const nextStyles = (previousStyles) => {
        return previousStyles.map((prev, i) => {
          return { y: spring(i, springConfig) }
        })
      }

      return (
        <div className={ this.getClassNames() }>
          <section className='section-intro'>
            <p>Hello! {"I'm"} Anna <em className='em-special'>(AN-uh)</em> Yovandich <em className='em-special'>(YO-von-ditch)</em> &mdash; a front-end developer, empathetic thinker, and life-long learner. I love discussing, designing, and building user experiences.</p>
            <Link to='/cv' className='button'>Resume</Link>
          </section>
          <section>
            <h2>Recent Work</h2>
            <StaggeredMotion defaultStyles={defaultStyles} styles={nextStyles}>
            {(interpolatedStyles) => {
              return <ul className='content-list'>
                {interpolatedStyles.map(({y}, idx) => {
                  const newstyle = this.getStyle(idx, y);
                  console.log('hereeee', interpolatedStyles, newstyle)
                  return (
                    <li className='content-list__item' style={newstyle} key={idx}>
                      <h3><a href='http://jdate.com' target='_blank'>Spark Networks (JDate)</a></h3>
                      <p>I contributed as a front-end lead across two sprints, completing the feature-rich Browse and Activity sections.</p>
                      <ul className='tag-list'>
                        <li className="tag-list__item">Ember</li>
                        <li className="tag-list__item">Sass</li>
                        <li className="tag-list__item">Grunt</li>
                        <li className="tag-list__item clear-left">AEM</li>
                      </ul>
                    </li>
                  );
                })}
              </ul>
            }}
          </StaggeredMotion>

          </section>
          <section>
            <h2>Experiments</h2>
            <ul>
              <li></li>
            </ul>
            <ul className='other-list'>
              <li className='other-list__item'>
                <h3><Link to='/squares'>Squares</Link></h3>
                <ul>
                  <li className="tag-list__item">React</li>
                  <li className="tag-list__item">Snap.svg</li>
                  <li className="tag-list__item">Sass</li>
                </ul>
              </li>
              <li className='other-list__item'>
                <h3><Link to='/slider'>Slider</Link></h3>
                <ul>
                  <li className="tag-list__item">React</li>
                  <li className="tag-list__item">React-Motion</li>
                  <li className="tag-list__item">Sass</li>
                </ul>
              </li>
            </ul>
          </section>
        </div>
      )
    }
}

Home.propTypes = {
    actions: PropTypes.shape({
        findFetchContent: PropTypes.func
    }),
    isFetching: PropTypes.bool,
    content: PropTypes.object
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

function mapStateToProps (state, ownProps) {
    const { content } = state
    const { path } = ownProps

    const {
        isFetching,
        notContent
    } = content[path] || {
        isFetching: true,
        notContent: {}
    }

    return {
        path,
        notContent,
        isFetching
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

// <li className='content-list__item' style={this.getStyle(style)}>
//   <h3><a href='http://wgnamerica.com' target='_blank'>WGN America</a></h3>
//   <div>
//   <p>I led a team of internal and remote developers to overhaul the existing WGN site with a modular, responsive, and modern experience.</p>
//   </div>
//   <ul className='tag-list'>
//     <li className="tag-list__item">Ember</li>
//     <li className="tag-list__item">Sass</li>
//     <li className="tag-list__item">Grunt</li>
//     <li className="tag-list__item clear-left">Python+Django</li>
//   </ul>
// </li>
// <li className='content-list__item' style={this.getStyle(style)}>
//   <h3><a href='http://socialsf.ferrari.com/' target='_blank'>Ferrari</a></h3>
//   <p>I was the lead front-end developer for this responsive game-ified social aggregator built on a tight 6 week (3 sprint) deadline.</p>
//   <p>This was the first React+Redux+Webpack site built for production at RED Interactive. It served as the first edition of a new front-end stack and boilerplate.</p>
//   <ul className='tag-list'>
//     <li className="tag-list__item">React</li>
//     <li className="tag-list__item">Redux</li>
//     <li className="tag-list__item">Webpack</li>
//     <li className="tag-list__item clear-left">Python+Django</li>
//   </ul>
// </li>
// <li className='content-list__item' style={this.getStyle(style)}>
//   <h3><a href='http://pechanga.com' target='_blank'>Pechanga</a></h3>
//   <p>Pechanga Resort &amp; Casino needed a flexible layout and component system to accomodate their large breadth of variable content.</p>
//   <p>I built the responsive layout, component system, and interactive styleguide; then oversaw post-launch feature development.</p>
//   <ul className='tag-list'>
//     <li className="tag-list__item">Ember</li>
//     <li className="tag-list__item">Sass</li>
//     <li className="tag-list__item">Grunt</li>
//     <li className="tag-list__item clear-left">Python+Django</li>
//   </ul>
// </li>
// <li className='content-list__item' style={this.getStyle(style)}>
//   <h3><a href='http://jdate.com' target='_blank'>Spark Networks (JDate)</a></h3>
//   <p>I contributed as a front-end lead across two sprints, completing the feature-rich Browse and Activity sections.</p>
//   <ul className='tag-list'>
//     <li className="tag-list__item">Ember</li>
//     <li className="tag-list__item">Sass</li>
//     <li className="tag-list__item">Grunt</li>
//     <li className="tag-list__item clear-left">AEM</li>
//   </ul>
// </li>
// <li className='content-list__item' style={this.getStyle(style)}>
//   <h3><a href='http://submit.elreynetwork.com' target='_blank'>El Rey Network</a></h3>
//   <p>The single-page creative submission site for El Rey Network is comprised of creative prompts and a submission form. I developed the responsive front-end using ember.js and custom-built form validation components.</p>
//   <ul className='tag-list'>
//     <li className="tag-list__item">Ember</li>
//     <li className="tag-list__item">Sass</li>
//     <li className="tag-list__item">Grunt</li>
//     <li className="tag-list__item clear-left">Python+Django</li>
//   </ul>
// </li>
// <li className='content-list__item' style={this.getStyle(style)}>
//   <h3><a href='http://battletrain.lionel.com/' target='_blank'>Lionel Battletrain</a></h3>
//   <p>This cute microsite for the Lionel Battletrain game was my first project at RED Interactive.</p>
//   <p>I created an adaptive experience with custom parallax and audio-synced animation sequence.</p>
//   <ul className='tag-list'>
//     <li className="tag-list__item">jQuery</li>
//     <li className="tag-list__item">Sass</li>
//     <li className="tag-list__item">Grunt</li>
//   </ul>
// </li>
