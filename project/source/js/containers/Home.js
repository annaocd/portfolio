import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import cx from 'bem-classnames'
import * as actions from '../state/modules/modal'

import Resume from '../components/Resume'
import InView from '../components/InView'
import ModalLink from '../components/ModalLink'

import '../../stylesheets/components/home.scss'
import img_bomb from '../../assets/img/bomb.jpg'

class Home extends Component {
    constructor(props) {
      super(props)
    }

    getClassNames () {
      const { isFetching } = this.props
      const classes = {
          name: 'home',
          states: ['fetching']
      }

      return cx(classes, { fetching: isFetching })
    }

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
            <div className='column column--content'>
              <p className='text-xlarge'>{"I'm"} Anna <em className='em-special'>(AN-uh)</em> Yovandich <em className='em-special'>(YO-von-ditch)</em></p>
              <p className='text-large'>I love discussing, designing, and developing flexible and intuitive user experiences.</p>
              <p className='text-large'>Since my first taste of web programming as a highschool elective, I have immersed myself in pixels, lines, boxes, attributes, properties, functions, and semantics &mdash; satiating my gluttony for both punishment and delight.</p>
              <p className='text-large'>{"I'm"} at my best when {"I'm"} creating with code and collaborating with clever cohorts.</p>
              <ModalLink component={Resume}>Resume <i className='material-icons'>filter_none</i></ModalLink>
            </div>
            <figure className='column column--image'>
              <img src={img_bomb} alt="Anna's face blocked by cat head" />
            </figure>
          </section>
          <section>
            <h2>Recent Work</h2>
            <ul className='content-list'>
              <InView className='content-list__item' pageY={this.props.pageY}>
                <h3><a href='http://wgnamerica.com' target='_blank'>WGN America</a></h3>
                <div>
                <p>I led a team of internal and remote developers to overhaul the existing WGN site with a modular, responsive, and modern experience.</p>
                <p>As the lead front-end developer, I defined routes, models, layouts, and component architecture for the site.</p>
                </div>
                <ul className='tag-list'>
                  <li className="tag-list__item">Ember</li>
                  <li className="tag-list__item">Sass</li>
                  <li className="tag-list__item">Grunt</li>
                  <li className="tag-list__item clear-left">Python+Django</li>
                </ul>
              </InView>
              <InView className='content-list__item' pageY={this.props.pageY}>
                <h3><a href='http://socialsf.ferrari.com/' target='_blank'>Ferrari</a></h3>
                <p>I was the lead front-end developer for this responsive game-ified social aggregator built on a tight 6 week (3 sprint) deadline.</p>
                <p>As the first React+Redux+Webpack site built for production at RED Interactive, it required constructive debate, rapid testing, and decisiveness. It served as the first edition of a new front-end stack and boilerplate.</p>
                <ul className='tag-list'>
                  <li className="tag-list__item">React</li>
                  <li className="tag-list__item">Redux</li>
                  <li className="tag-list__item">Webpack</li>
                  <li className="tag-list__item clear-left">Python+Django</li>
                </ul>
              </InView>
              <InView className='content-list__item' pageY={this.props.pageY}>
                <h3><a href='http://pechanga.com' target='_blank'>Pechanga Resort &amp; Casino</a></h3>
                <p>Pechanga needed a flexible layout and component system to accomodate their large breadth of variable content.</p>
                <p>I built the responsive layout, component system, and interactive styleguide; then oversaw post-launch feature development.</p>
                <ul className='tag-list'>
                  <li className="tag-list__item">Ember</li>
                  <li className="tag-list__item">Sass</li>
                  <li className="tag-list__item">Grunt</li>
                  <li className="tag-list__item clear-left">Python+Django</li>
                </ul>
              </InView>
              <InView className='content-list__item' pageY={this.props.pageY}>
                <h3><a href='http://jdate.com' target='_blank'>Spark Networks (JDate)</a></h3>
                <p>We worked with Spark Networks developers to adapt the legacy API to a completely redesigned front-end. I joined the dev team as a front-end lead during two sprints (of many) and UAT.</p>
                <p>I was responsible for building the flexible and feature-rich 'Browse' and 'Your Activity' sections of the site.</p>
                <ul className='tag-list'>
                  <li className="tag-list__item">Ember</li>
                  <li className="tag-list__item">Sass</li>
                  <li className="tag-list__item">Grunt</li>
                  <li className="tag-list__item clear-left">AEM</li>
                </ul>
              </InView>
              <InView className='content-list__item' pageY={this.props.pageY}>
                <h3><a href='http://worldcupessentials.ff0000.com/team/ger' target='_blank'>World Cup Essentials</a></h3>
                <p>ESPN needed a site to showcase World Cup history, team details, and match updates.</p>
                <p>As one of two front-end developers on the project, I was responsible for building the responsive layout, modular component system, and model architecture.</p>
                <ul className='tag-list'>
                  <li className="tag-list__item">Ember</li>
                  <li className="tag-list__item">Sass</li>
                  <li className="tag-list__item">Grunt</li>
                  <li className="tag-list__item clear-left">Python+Django</li>
                </ul>
              </InView>
              <InView className='content-list__item' pageY={this.props.pageY}>
                <h3><a href='http://battletrain.lionel.com/' target='_blank'>Lionel Battletrain</a></h3>
                <p>This cute microsite for the Lionel Battletrain game was my first project at RED Interactive.</p>
                <p>I created a responsive and adaptive experience with custom parallax and audio-synced animation sequence.</p>
                <ul className='tag-list'>
                  <li className="tag-list__item">jQuery</li>
                  <li className="tag-list__item">Sass</li>
                  <li className="tag-list__item">Grunt</li>
                </ul>
              </InView>
            </ul>
          </section>
          <section>
            <h2>Experiments</h2>
            <ul>
              <li></li>
            </ul>
            <ul className='box-list'>
              <li className='box-list__item'>
                <h3><Link to='/squares'>Squares</Link></h3>
                <ul>
                  <li className="tag-list__item">React</li>
                  <li className="tag-list__item">Snap.svg</li>
                  <li className="tag-list__item">Sass</li>
                </ul>
              </li>
              <li className='box-list__item'>
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
        openModal: PropTypes.func
    })
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Home)
