import { useEffect, useRef } from 'react';


const ContextMenu = ({ data, hide }) => {
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClick= (event) => {
            if(data.visible) hide();
        }
        document.addEventListener("mouseup", handleClick);
        return () => {
            document.removeEventListener("mouseup", handleClick);
        };
    }, [wrapperRef, hide, data.visible]);
  
    return (
        <>
            <div className="contextMenu" ref={wrapperRef} style={{
                left: data.position.x,
                top: data.position.y,
                display: data.visible ? 'inherit' : 'none' }}
            >
                {data?.content}
            </div>
        </>
    )
}

export default ContextMenu