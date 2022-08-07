import { useEffect, useRef } from "react";
import { useReusableUI } from "../ReusableUIContext"

const Alert = () => {
    const { alert, setAlert } = useReusableUI();
    const ref = useRef();

    useEffect(() => {
        if (alert !== '') {
            ref.current.classList.add('show');
            setTimeout(() => {
                ref.current.classList.remove('show');
                setAlert('');
            }, 2000)
        }
    }, [alert, setAlert]);
    
    return (
        <div ref={ ref } className='alert'>{ alert }</div>
    )
}

export default Alert