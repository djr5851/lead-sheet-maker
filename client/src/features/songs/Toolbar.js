import React from 'react'

const Toolbar = ({ onSave }) => {
    return (
        <div>
            <button onClick={onSave}>Save</button>
        </div>
    )
}

export default Toolbar