import React from 'react'
import { Link } from 'react-router'

import DateRange from './DateRange'

import '../../stylesheets/components/resume.scss'

function Resume (props) {
  //<li>Conducted interviews and skills assessments of all front-end candidates</li>
  // <section>
  //   <h2>Strengths</h2>
  //   <ul>
  //     <li>Calm</li>
  //     <li>Pragmatic</li>
  //     <li>Diligent</li>
  //     <li>Communicative</li>
  //     <li>Tenacious</li>
  //   </ul>
  // </section>
  // <ul className='bulleted-list'>
  //   <li className='bulleted-list__item'>HTML [semantics, accessibility]</li>
  //   <li className='bulleted-list__item'>CSS [Sass, postcss, bem]</li>
  //   <li className='bulleted-list__item'>JavaScript [ES6, Ember, React, Redux, Backbone, Node]</li>
  //   <li className='bulleted-list__item'>Tooling [Grunt, Webpack, Yeoman]</li>
  //   <li className='bulleted-list__item'>Version Control [Git, SVN]</li>
  //   <li className='bulleted-list__item'>Browser and screen compatibility</li>
  //   <li className='bulleted-list__item'>Data modeling and integration</li>
  // </ul>
  // <li className='bulleted-list__item'>Maintained and evolved front-end stack (tools, libraries, and practices) through research, debate, and prototyping</li>
  return (
    <div className='resume'>
      <header className='resume__header-main'>
        <h1>Anna Yovandich</h1>
        <h2>UI Developer</h2>
        <a className='email-link' href='mailto:anna.yovandich@gmail.com'>anna.yovandich@gmail.com</a>
        <a className='phone-link' href='tel:3109934362'>310-993-4362</a>
        <a className='button' href='../../assets/docs/resume.pdf' download title='download pdf'><i className='material-icons'>file_download</i></a>
      </header>
      <section className='resume__section resume__section--purpose'>
        <h2 className='resume__heading resume__heading--purpose'>Purpose</h2>
        <p>To develop robust and intuitive web experiences that provide valuable services to users. To be a leader and a learner on a focused and collaborative team.</p>
      </section>
      <section className='resume__section resume__section--skills'>
        <h2 className='resume__heading resume__heading--skills'>Skills</h2>
        <ul className='bulleted-list'>
          <li className='bulleted-list__item'>HTML</li>
          <li className='bulleted-list__item'>CSS</li>
          <li className='bulleted-list__item'>JavaScript</li>
          <li className='bulleted-list__item'>Tooling</li>
          <li className='bulleted-list__item'>Version Control</li>
          <li className='bulleted-list__item'>Browser and screen compatibility</li>
          <li className='bulleted-list__item'>Data modeling and integration</li>
        </ul>
      </section>
      <section>
      <h2 className='resume__heading resume__heading--experience'>Experience</h2>
      <ul>
        <li className='resume__timeframe'>
          <header>
            <h3>RED Interactive</h3>
            <h4>Santa Monica, CA</h4>
            <DateRange content={{ dateStart: 'May 2013', dateEnd: 'Dec 2016' }} />
          </header>
          <ul className='block-list'>
            <li><DateRange content={{ dateStart: 'Oct. 2015', dateEnd: 'Dec. 2016'}} /><span>assoc director, front-end</span></li>
            <li><DateRange content={{ dateStart: 'May 2013', dateEnd: 'Oct 2015' }} /><span>sr. front-end engineer</span></li>
          </ul>
          <ul className='bulleted-list'>
            <li className='bulleted-list__item'>Evolved front-end stack through research, debate, and prototyping</li>
            <li className='bulleted-list__item'>Trained and mentored engineering team members through on-boarding and one-on-one sessions</li>
            <li className='bulleted-list__item'>Contributed on an internal RED product team (Scarlet and Ad Analytics)</li>
            <li className='bulleted-list__item'>Built responsive, cross-browser, maintainable front-end architecture for a variety of client projects</li>
          </ul>
        </li>
        <li className='resume__timeframe'>
          <header>
            <h3>Crispin Porter + Bogusky</h3>
            <h4>Boulder, CO</h4>
            <DateRange content={{ dateStart: 'Nov 2008', dateEnd: 'May 2013' }} />
          </header>
          <ul className='block-list'>
            <li><DateRange content={{ dateStart: 'Oct 2011', dateEnd: 'May 2013'}} /><span>architecture lead</span></li>
            <li><DateRange content={{ dateStart: 'Jun 2010', dateEnd: 'Oct 2011' }} /><span>sr. front-end developer</span></li>
            <li><DateRange content={{ dateStart: 'Nov 2008', dateEnd: 'Jun. 2010' }} /><span>front-end developer</span></li>
          </ul>
          <ul className='bulleted-list'>
            <li className='bulleted-list__item'>Led front-end development on a world-wide Agile team for American Express OPEN Forum</li>
            <li className='bulleted-list__item'>Helped define and promote best practices through code reviews, pair programming, and boilerplate/tooling evolvement</li>
            <li className='bulleted-list__item'>Taught an 8 week interactive development course for Miami Ad School</li>
          </ul>
        </li>
        <li className='resume__timeframe'>
          <header>
            <h3>Atomicdust </h3>
            <h4>St. Louis, MO</h4>
            <DateRange content={{ dateStart: 'Dec 2005', dateEnd: 'Oct 2008' }} />
          </header>
          <ul className='block-list'>
            <li><DateRange content={{ dateStart: 'Dec 2006', dateEnd: 'Oct 2008'}} /><span>interactive developer</span></li>
            <li><DateRange content={{ dateStart: 'Dec 2005', dateEnd: 'Dec 2006' }} /><span>intern</span></li>
          </ul>
          <ul className='bulleted-list'>
            <li className='bulleted-list__item'>Collaborated with a small multi-disciplinary interactive team from ideation to execution</li>
            <li className='bulleted-list__item'>Delivered custom application and presentation layers for client web projects</li>
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
