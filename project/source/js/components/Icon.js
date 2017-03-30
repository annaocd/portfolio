import React, { PropTypes, Component } from 'react'
import cx from 'bem-classnames'

const GLYPHS = {
    'instagram': require('../../icons/instagram.svg'),
    'twitter': require('../../icons/twitter.svg'),
    'twitter-like': require('../../icons/twitter-like.svg'),
    'twitter-retweet': require('../../icons/twitter-retweet.svg'),
    'twitter-tweet': require('../../icons/twitter-tweet.svg')
}

function Icon ({glyph, width='100%', height='100%', className='icon'}) {
    let classes = {
        name: 'icon',
        modifiers: ['type']
    }

    return (
        <svg className={cx(classes, { type: glyph })} width={ width } height={ height }>
            <use xlinkHref={ GLYPHS[glyph] } />
        </svg>
    );
}

export default Icon
