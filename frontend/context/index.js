import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

function GlobalState({ children }) {
    
    const [currentUsername, setCurrentUsername] = useState("");
    

    return (
        <GlobalContext.Provider
            value={{
                currentUsername, setCurrentUsername
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalState;
