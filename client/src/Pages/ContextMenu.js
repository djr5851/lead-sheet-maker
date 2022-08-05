import { useEffect, useRef } from 'react';


const ContextMenu = ({ data, hide }) => {
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClick= (event) => {
                hide();
        }
        document.addEventListener("mouseup", handleClick);
        return () => {
            document.removeEventListener("mouseup", handleClick);
        };
    }, [wrapperRef, hide]);
  
    return (
        <>
            <div className="contextMenu" ref={wrapperRef} style={{
                left: data.position.x,
                top: data.position.y,
                display: data.visible ? 'inherit' : 'none' }}
            >
                {data.content}
            </div>
        </>
    )
}

export default ContextMenu