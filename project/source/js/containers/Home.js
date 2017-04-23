import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import cx from 'bem-classnames'
import * as actions from '../state/modules/modal'

import Resume from '../components/Resume'
import InView from '../components/InView'
import ModalLink from '../components/ModalLink'
import AspectRatio from '../components/AspectRatio'

import '../../stylesheets/components/home.scss'
import img_bomb from '../../assets/img/sasha.png'

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
            <AspectRatio ratio={75.06} image={img_bomb} className='column column--image' />
            <div className='column column--content'>
              <p className='text-xlarge'>Anna<em className='em-special'>(AN-uh)</em> Yovandich<em className='em-special'>(YO-von-ditch)</em></p>
              <p className='text-large'>Experienced Frontend Engineer</p>
              <p className='text-large'>Builds sturdy, responsive, componentized interfaces through collaboration and iteration</p>
              <p className='text-large'>Strives for improvement, learns with purpose, leads by example</p>
              <footer>
                <ModalLink component={Resume}>resume <i className='material-icons'>filter_none</i></ModalLink>
                <a href='https://github.com/annayo' className='button'>github <i className='material-icons'>launch</i></a>
              </footer>
            </div>
          </section>
          <section>
            <h2>Recent Work</h2>
            <ul className='project-list'>
              <InView className='project-list__item' pageY={this.props.pageY}>
                <h3><a href='http://socialsf.ferrari.com/' className='external-link'>Ferrari</a></h3>
                <p>I was lead frontend engineer for this responsive game-ified social aggregator built on a tight 6 week (3 sprint) deadline.</p>
                <p>As the first React+Redux+Webpack site built for production at RED Interactive, it required constructive debate, rapid testing, and decisiveness. It served as the first edition of a new frontend stack and boilerplate.</p>
                <ul className='tag-list'>
                  <li className="tag-list__item">React</li>
                  <li className="tag-list__item">Redux</li>
                  <li className="tag-list__item">Webpack</li>
                  <li className="tag-list__item clear-left">Python+Django</li>
                </ul>
              </InView>
              <InView className='project-list__item' pageY={this.props.pageY}>
                <h3><a href='http://pechanga.com' className='external-link'>Pechanga Resort &amp; Casino</a></h3>
                <p>Pechanga required a flexible layout and component system to accomodate their large breadth of variable content.</p>
                <p>I built the responsive layout, component library, model architecture, and interactive styleguide; then oversaw post-launch feature development.</p>
                <ul className='tag-list'>
                  <li className="tag-list__item">Ember</li>
                  <li className="tag-list__item">Sass</li>
                  <li className="tag-list__item">Grunt</li>
                  <li className="tag-list__item clear-left">Python+Django</li>
                </ul>
              </InView>
              <InView className='project-list__item' pageY={this.props.pageY}>
                <h3><a href='http://wgnamerica.com' className='external-link'>WGN America</a></h3>
                <p>I led frontend development in collaboration with a remote team to overhaul the existing WGN site with a modular, responsive, and modern experience.</p>
                <p>Working closely with UX and backend, I helped define routes, data structures, and naming conventions for a new REST API; while concurrently building frontend models, responsive layouts, and components for the site.</p>
                <ul className='tag-list'>
                  <li className="tag-list__item">Ember</li>
                  <li className="tag-list__item">Sass</li>
                  <li className="tag-list__item">Grunt</li>
                  <li className="tag-list__item clear-left">Python+Django</li>
                </ul>
              </InView>
              <InView className='project-list__item' pageY={this.props.pageY}>
                <h3><a href='http://jdate.com' className='external-link'>Spark Networks (JDate)</a></h3>
                <p>We worked with Spark Networks engineers to adapt a legacy API to a completely redesigned frontend. I joined the team as a frontend lead during three sprints, then spot-supporting when needed.</p>
                <p>I was responsible for building the 'Browse' and 'Your Activity' sections of the site, featuring a robust search interface, stateful list pagination, and user-preference management.</p>
                <ul className='tag-list'>
                  <li className="tag-list__item">Ember</li>
                  <li className="tag-list__item">Sass</li>
                  <li className="tag-list__item">Grunt</li>
                  <li className="tag-list__item clear-left">AEM</li>
                </ul>
              </InView>
              <InView className='project-list__item' pageY={this.props.pageY}>
                <h3><a href='http://worldcupessentials.ff0000.com' className='external-link'>World Cup Essentials</a></h3>
                <p>ESPN needed a site to showcase World Cup history, team details, and match updates.</p>
                <p>As one of two frontend developers on the project, I was responsible for building the responsive layout, component library, and model architecture.</p>
                <ul className='tag-list'>
                  <li className="tag-list__item">Ember</li>
                  <li className="tag-list__item">Sass</li>
                  <li className="tag-list__item">Grunt</li>
                  <li className="tag-list__item clear-left">Python+Django</li>
                </ul>
              </InView>
            </ul>
          </section>
          <section>
            <h2>Experiments</h2>
            <ul className='box-list'>
              <li className='box-list__item'>
                <h3><Link to='/squares' className='internal-link'>Squares</Link></h3>
                <ul>
                  <li className="tag-list__item">React</li>
                  <li className="tag-list__item">Snap.svg</li>
                  <li className="tag-list__item">Sass</li>
                </ul>
              </li>
              <li className='box-list__item'>
                <h3><Link to='/slider' className='internal-link'>Slider</Link></h3>
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
