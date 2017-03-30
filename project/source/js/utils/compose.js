import React from 'react'
import reactStamp from 'react-stamp'

const componentStamp = reactStamp(React)

export function composeContainer (displayName, ...mixins) {
  return componentStamp.compose({ displayName }, ...mixins)
}

export function composeComponent (displayName, ...mixins) {
  return componentStamp.compose({ displayName }, ...mixins)
}
