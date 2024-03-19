import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

function GlobalState({ children }) {
    const [currentUsername, setCurrentUsername] = useState("");
    const [firstLaunch, setFirstLaunch] = useState(false); //change back later
    const [isAuth, setIsAuth] = useState(true); //change back later
    return (
        <GlobalContext.Provider
            value={{
                currentUsername,
                setCurrentUsername,
                firstLaunch,
                setFirstLaunch,
                isAuth,
                setIsAuth,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalState;
