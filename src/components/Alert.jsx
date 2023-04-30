import React from 'react'

const Alert = ({message, type}) => {
    return (
        <div className={`_Alert _${type}_Alert`}>
            {message}
        </div>
    )
}

export default Alert