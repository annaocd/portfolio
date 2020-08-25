import React from 'react'
import { Link } from 'react-router'

import DateRange from './DateRange'

import '../../stylesheets/components/resume.scss'
import '../../stylesheets/components/resume--print.scss'

function Resume (props) {
  return (
    <div className='resume'>
      <header className='resume__header-main'>
        <h1>Anna Yovandich</h1>
        <h2>Frontend Engineer</h2>
        <a className='icon-text icon-text--email' href='mailto:anna.yovandich@gmail.com'>anna.yovandich@gmail.com</a>
        <a className='icon-text icon-text--phone' href='tel:3109934362'>310-993-4362</a>
        <span className='icon-text icon-text--home'>Portland</span>
        <a className='button' href='../../assets/docs/resume-anna-yovandich.pdf' download title='download pdf'><i className='material-icons'>file_download</i></a>
      </header>
      <section className='resume__section resume__section--purpose'>
        <h2 className='resume__heading resume__heading--purpose'>Purpose</h2>
        <p>To develop robust and intuitive web applications that provide valuable services to users. To be a leader and a learner on a focused and collaborative team.</p>
      </section>
      <section className='resume__section resume__section--skills'>
        <h2 className='resume__heading resume__heading--skills'>Skills</h2>
        <ul className='bulleted-list'>
          <li className='bulleted-list__item'>HTML</li>
          <li className='bulleted-list__item'>CSS
            <ul className='mini-list'>
              <li className='mini-list__item'>SCSS</li>
              <li className='mini-list__item'>SMACSS</li>
              <li className='mini-list__item'>BEM</li>
            </ul>
          </li>
          <li className='bulleted-list__item'>JavaScript
            <ul className='mini-list'>
              <li className='mini-list__item'>ES6</li>
              <li className='mini-list__item'>React+Redux</li>
              <li className='mini-list__item'>Ember</li>
              <li className='mini-list__item'>Backbone</li>
            </ul>
          </li>
          <li className='bulleted-list__item'>Tooling
            <ul className='mini-list'>
              <li className='mini-list__item'>Webpack</li>
              <li className='mini-list__item'>Grunt</li>
              <li className='mini-list__item'>Yeoman</li>
            </ul>
          </li>
          <li className='bulleted-list__item'>Version control</li>
          <li className='bulleted-list__item'>Browser and screen compatibility</li>
          <li className='bulleted-list__item'>Data modeling and integration</li>
          <li className='bulleted-list__item'>Accessibility</li>
        </ul>
      </section>
      <section className='resume__section resume__section--experience'>
        <h2 className='resume__heading resume__heading--experience'>Experience</h2>
        <ul>
          <li className='resume__timeframe'>
            <header>
              <h3>Stackery</h3>
              <h4>Portland, OR</h4>
              <DateRange content={{ dateStart: 'Sep 2017' }} />
            </header>
            <ul className='block-list'>
              <li><DateRange content={{ dateStart: 'Dec. 2019' }} /><span>lead engineer</span></li>
              <li><DateRange content={{ dateStart: 'Sep. 2017', dateEnd: 'Dec. 2019' }} /><span>sr. engineer</span></li>
            </ul>
            <ul className='bulleted-list'>
              <li className='bulleted-list__item'>Build and evolve frontend architecture from initial product launch</li>
              <li className='bulleted-list__item'>Design, develop, and test user experience features and improvements</li>
              <li className='bulleted-list__item'>Maintain code quality, patterns, and best practices of frontend codebase</li>
              <li className='bulleted-list__item'>Lead a team to build and deploy weekly feature releases</li>
            </ul>
          </li>
          <li className='resume__timeframe'>
            <header>
              <h3>RED Interactive</h3>
              <h4>Santa Monica, CA</h4>
              <DateRange content={{ dateStart: 'May 2013', dateEnd: 'Dec 2016' }} />
            </header>
            <ul className='block-list'>
              <li><DateRange content={{ dateStart: 'Oct. 2015', dateEnd: 'Dec. 2016' }} /><span>assoc director, frontend engineering</span></li>
              <li><DateRange content={{ dateStart: 'May 2013', dateEnd: 'Oct 2015' }} /><span>sr. frontend engineer</span></li>
            </ul>
            <ul className='bulleted-list'>
              <li className='bulleted-list__item'>Trained and mentored engineering team members through on-boarding and one-on-one sessions</li>
              {/* <li className='bulleted-list__item'>Evolved frontend stack through research, debate, and prototyping</li> */}
              <li className='bulleted-list__item'>Contributed to weekly ideation, maintenance, and feature development on RED products team</li>
              <li className='bulleted-list__item'>Built responsive and maintainable frontend architecture for a variety of client projects</li>
            </ul>
          </li>
          <li className='resume__timeframe'>
            <header>
              <h3>Crispin Porter + Bogusky</h3>
              <h4>Boulder, CO</h4>
              <DateRange content={{ dateStart: 'Nov 2008', dateEnd: 'May 2013' }} />
            </header>
            <ul className='block-list'>
              <li><DateRange content={{ dateStart: 'Oct 2011', dateEnd: 'May 2013' }} /><span>architecture lead</span></li>
              <li><DateRange content={{ dateStart: 'Jun 2010', dateEnd: 'Oct 2011' }} /><span>sr. frontend developer</span></li>
              <li><DateRange content={{ dateStart: 'Nov 2008', dateEnd: 'Jun. 2010' }} /><span>frontend developer</span></li>
            </ul>
            <ul className='bulleted-list'>
              <li className='bulleted-list__item'>Led frontend development on a distributed Agile team for American Express OPEN Forum</li>
              <li className='bulleted-list__item'>Defined and promoted best practices through code reviews, pair programming, and boilerplate/tooling evolvement</li>
              <li className='bulleted-list__item'>Taught an 8 week Interactive Development course for Miami Ad School</li>
            </ul>
          </li>
          <li className='resume__timeframe'>
            <header>
              <h3>Atomicdust </h3>
              <h4>St. Louis, MO</h4>
              <DateRange content={{ dateStart: 'Dec 2005', dateEnd: 'Oct 2008' }} />
            </header>
            <ul className='block-list'>
              <li><DateRange content={{ dateStart: 'Dec 2006', dateEnd: 'Oct 2008' }} /><span>interactive developer</span></li>
              <li><DateRange content={{ dateStart: 'Dec 2005', dateEnd: 'Dec 2006' }} /><span>intern</span></li>
            </ul>
            <ul className='bulleted-list'>
              <li className='bulleted-list__item'>Collaborated with a small multi-disciplinary interactive team from ideation to execution</li>
              <li className='bulleted-list__item'>Translated client needs into application requirements and deliverables</li>
              <li className='bulleted-list__item'>Implemented custom data, application, and presentation layers for client web projects</li>
            </ul>
          </li>
        </ul>
      </section>
      <section className='resume__section resume__section--education'>
        <h2 className='resume__heading resume__heading--education'>Education</h2>
        <ul>
          <li className='resume__timeframe'>
            <header>
              <h3>Webster University</h3>
              <h4>St. Louis, MO</h4>
              <DateRange content={{ dateStart: 'Aug 2004', dateEnd: 'Dec 2006' }} />
            </header>
            <p>Bachelor of Science, Computer Science; Minor, Information Systems</p>
            <p>Graduated with Department Honors 3.97/4.0</p>
          </li>
          <li className='resume__timeframe'>
            <header>
              <h3>Ranken Technical College</h3>
              <h4>St. Louis, MO</h4>
              <DateRange content={{ dateStart: 'Aug 2002', dateEnd: 'May 2004' }} />
            </header>
            <p>Associate of Technology, Web-based Systems</p>
            <p>Dean{"'s"} List Recipient 3.7/4.0</p>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default Resume
