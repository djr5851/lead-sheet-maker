import { useEffect, useRef } from 'react';
import { useReusableUI } from '../ReusableUIContext';


const ContextMenu = () => {
    const wrapperRef = useRef(null);
    const { contextMenu, hideContextMenu } = useReusableUI();

    useEffect(() => {
        const handleClick= (event) => {
            if(contextMenu.visible) hideContextMenu();
        }
        document.addEventListener("mouseup", handleClick);
        return () => {
            document.removeEventListener("mouseup", handleClick);
        };
    }, [wrapperRef, hideContextMenu, contextMenu.visible]);
  
    return (
        <>
            <div className="contextMenu" ref={wrapperRef} style={{
                left: contextMenu.position.x,
                top: contextMenu.position.y,
                display: contextMenu.visible ? 'inherit' : 'none' }}
            >
                {contextMenu?.content}
            </div>
        </>
    )
}

export default ContextMenu