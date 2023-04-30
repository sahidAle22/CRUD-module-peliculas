import React from 'react'

const Genre = ({ name }) => {
    return (
        <div className={`_gender _gender${name}`}>
            {name}
        </div>
    )
}

export default Genre