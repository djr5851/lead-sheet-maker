import React from 'react'

const Toolbar = ({ onSave, setSong, setContextMenu }) => {
    return (
        <div className='toolbar'>
            <img className="toolbar--icon" src="/save-icon.png" alt="save" onClick={onSave}/>
            <img className="toolbar--icon" src="/time-icon.png" alt="time" onClick={(event) => setContextMenu({
                visible: true,
                position: { x: event.clientX, y: event.clientY },
                content:
                    <div>
                        <button className="context--button" onClick={() => setSong(prev => ({ ...prev, time: 4 }))}>4/4</button>
                        <button className="context--button" onClick={() => setSong(prev => ({ ...prev, time: 3 }))}>3/4</button>
                    </div>
            })}/>
        </div>
    )
}

export default Toolbar