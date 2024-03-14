import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

function GlobalState({ children }) {
    
    const [currentUsername, setCurrentUsername] = useState("");
    const [firstLaunch, setFirstLaunch] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    return (
        <GlobalContext.Provider
            value={{
                currentUsername, setCurrentUsername,
                firstLaunch, setFirstLaunch,
                isAuth, setIsAuth
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalState;
