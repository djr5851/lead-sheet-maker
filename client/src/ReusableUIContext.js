import { createContext, useContext, useState } from "react";

const ReusableUIContext = createContext();

export const useReusableUI = () => {
    return useContext(ReusableUIContext)
}

export const ReusableUIProvider = ({ children }) => {
    const [contextMenu, setContextMenu] = useState({ 
        visible: false,
        position: { x: 0, y: 0},
        content: null
    });

    const [alert, setAlert] = useState('');
    
    const hideContextMenu = () => {
        setContextMenu(prev => ({ ...prev, visible: false }));
    }

    return (
        <ReusableUIContext.Provider value={{ contextMenu, setContextMenu, hideContextMenu, alert, setAlert }}>
            { children }
        </ReusableUIContext.Provider>        
    )
}