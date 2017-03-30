import { combineReducers } from 'redux'

import content from './content'
import modal from './modal'


const rootReducer = combineReducers({
    content,
    modal
})

export default rootReducer
