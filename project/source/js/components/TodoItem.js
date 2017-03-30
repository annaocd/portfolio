import React, { PropTypes } from 'react'
import cx from 'bem-classnames'

function TodoItem (props) {
    let classes = {
        name: 'todo-item',
        states: ['complete']
    }

    return (
        <li className={cx(classes, { complete: props.isComplete })}>
            {props.children}
        </li>
    );
}

TodoItem.propTypes = {
    //items: PropTypes.array
}

export default TodoItem
